package com.example.agrotechsolutions.services;
import com.example.agrotechsolutions.entities.Category;
import com.example.agrotechsolutions.entities.Product;
import com.example.agrotechsolutions.entities.Vendor;
import com.example.agrotechsolutions.repositories.ProductRepo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j

public class ProductServicesImpl implements ProductServices {

    @Autowired
    ProductRepo productRepo;

    /*@Override
    public List<Product> retrieveAllProducts() {

        return productRepo.findAll();

    }
*/
    @Override
    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(String id, Product product) {
        Product existingProduct = retrieveProductById(id);
        if (existingProduct == null) {
            throw new IllegalArgumentException("Invalid product ID: " + id);
        }
        existingProduct.setCode(product.getCode());
        existingProduct.setName(product.getName());
        existingProduct.setType(product.getType());
        existingProduct.setStatus(product.getStatus());
        existingProduct.setCurrency(product.getCurrency());
        existingProduct.setInventory(product.getInventory());
        existingProduct.setMedicated(product.getMedicated());
        existingProduct.setManufacturer(product.getManufacturer());
        existingProduct.setColor(product.getColor());
        existingProduct.setProductusage(product.getProductusage());
        existingProduct.setMaxOver(product.getMaxOver());
        existingProduct.setPrixUnitaireHt(product.getPrixUnitaireHt());
        existingProduct.setPrixUnitaireHt(product.getPrixUnitaireTtc());
        existingProduct.setTaxRate(product.getTaxRate());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setVendorSku(product.getVendorSku());
        existingProduct.setSalesSKU(product.getSalesSKU());
        return productRepo.save(existingProduct);
    }


    @Override
    public Product retrieveProductById(String idProduct) {
        Optional<Product> productOptional = productRepo.findById(idProduct);
        // Check if a value is present in the Optional
        if (productOptional.isPresent()) {
            return productOptional.get(); // Return the Product if it exists
        } else {
            // Handle the case when no product is found with the given ID
            throw new NoSuchElementException("Product with ID " + idProduct + " not found.");
        }
    }


    @Override
    public void deleteProduct(String idProduct) {

        productRepo.deleteById(idProduct);
    }

    @Override
    public Page<Product> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepo.findAll(pageable);
    }

    /*
@Override
public List<Product> findAll() {

    return productRepo.findAll();
}
*/


     @Override
    public void ExportProductsToCsv(HttpServletResponse servletResponse) throws IOException {
        List<Product> products = productRepo.findAll();

        String filename = "Products.csv";
        String csvContent = ConvertProductsToCsv(products);

        servletResponse.setContentType("text/csv");
        servletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + filename);

        servletResponse.getOutputStream().print(csvContent);
    }

    @Override
    public String ConvertProductsToCsv(List<Product> products) throws IOException {
        StringWriter writer = new StringWriter();
        CSVFormat format = CSVFormat.DEFAULT
                .withHeader("Code", "Name", "Status","Medication","Price without tax","Tax Rate", "Price with tax","Category")
                .withDelimiter(';');
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, format)) {
            for (Product product : products) {
                csvPrinter.printRecord(product.getCode(),product.getName(), product.getStatus(), product.getMedicated(), product.getPrixUnitaireHt(),product.getTaxRate(),product.getPrixUnitaireTtc(),product.getCategory()
                );
            }
        } catch (IOException e) {
            log.error("Error while writing CSV", e);
        }

        return writer.toString();
    }


    @Override
    public List<Product> searchProducts(Float taxRate, String category) {

        if (taxRate == null && category == null) {
            // If no criteria is provided, return all prods
            return productRepo.findAll();
        } else if (taxRate != null && category == null) {
            // If only name criteria is provided, search by taxRate
            return productRepo.findByTaxRate(taxRate);
        } else if (taxRate == null && category != null) {
            // If only city criteria is provided, search by category
            return productRepo.findByCategoryContainingIgnoreCase(category);
        } else {
            // If both taxRate and category criteria are provided, search by both
            return productRepo.findByTaxRateAndCategoryContainingIgnoreCase(taxRate, category);
        }

    }
    @Override
    public void archiveProduct(String id) {
        Optional<Product> productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setStatus(false); // Set status to archived
            productRepo.save(product);
        } else {
          log.info("Product not found with ID: " + id);

        }
    }
    @Override

    public void disArchiveProduct(String id) {
        Optional<Product> productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setStatus(true); // Set status to active
            productRepo.save(product);
        } else {
            log.info("couldn't archive product with ID: " + id);
        }
    }
    @Override
    public Page<Product> getArchivedProducts(Pageable pageable) {
        return productRepo.findByStatusFalse(pageable);
    }


}