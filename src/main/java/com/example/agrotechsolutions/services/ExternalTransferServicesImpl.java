package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.Product;
import com.example.agrotechsolutions.repositories.ExternalTransferRepo;
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
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service

public class ExternalTransferServicesImpl implements ExternalTransferServices {
    @Autowired
    ExternalTransferRepo externalTransferRepo;

    @Override
    public ExternalTransfer addExternalTransfer(ExternalTransfer externalTransfer) {
        return externalTransferRepo.save(externalTransfer);
    }

    @Override
    public ExternalTransfer updateExternalTransfer(String id, ExternalTransfer externalTransfer) {
        ExternalTransfer existingexternaltransfer = retrieveExternalTransferById(id);
        if (existingexternaltransfer == null) {
            throw new IllegalArgumentException("Invalid externaltransfer ID: " + id);
        }
        existingexternaltransfer.setTransactionCode(externalTransfer.getTransactionCode());
        existingexternaltransfer.setTransactionDate(externalTransfer.getTransactionDate());
        existingexternaltransfer.setWarehouseCode(externalTransfer.getWarehouseCode());
        existingexternaltransfer.getProduct().setType(externalTransfer.getProduct().getType());
        //existingexternaltransfer.setProductCode(externalTransfer.getProductCode());
        //existingexternaltransfer.setProductName(externalTransfer.getProductName());
        //existingexternaltransfer.setExternalSourceCostCenterCode(externalTransfer.getExternalSourceCostCenterCode());
        //existingexternaltransfer.setExternalCostCenterName(externalTransfer.getExternalCostCenterName());
        //existingexternaltransfer.setExternalSourceCostCenterType(externalTransfer.getExternalSourceCostCenterType());
        existingexternaltransfer.setInventoryUnits(externalTransfer.getInventoryUnits());
        existingexternaltransfer.setPrice(externalTransfer.getPrice());
        existingexternaltransfer.setUnitPrice(externalTransfer.getUnitPrice());
        existingexternaltransfer.setLotCode(externalTransfer.getLotCode());
        existingexternaltransfer.setLocationCode(externalTransfer.getLocationCode());
        existingexternaltransfer.setRefNumber(externalTransfer.getRefNumber());
        existingexternaltransfer.setEventDate(externalTransfer.getEventDate());
        existingexternaltransfer.setExpirationDate(externalTransfer.getExpirationDate());
        existingexternaltransfer.setTime(externalTransfer.getTime());
        existingexternaltransfer.setIsVoid(externalTransfer.getIsVoid());

        return externalTransferRepo.save(existingexternaltransfer);
    }


    @Override
    public ExternalTransfer retrieveExternalTransferById(String id) {
        Optional<ExternalTransfer> externalTransferOptional = externalTransferRepo.findById(id);
        if (externalTransferOptional.isPresent()) {
            return externalTransferOptional.get();
        } else {
            throw new NoSuchElementException("externalTransfer with ID " + id + " not found.");
        }
    }

    @Override

    public ExternalTransfer createExternalTransfer(ExternalTransfer externalTransfer) {
        double unitPrice = externalTransfer.getPrice() / externalTransfer.getInventoryUnits();
        externalTransfer.setUnitPrice(unitPrice);
        ExternalTransfer savedExternalTransfer = externalTransferRepo.save(externalTransfer);
        return savedExternalTransfer;
    }
    @Override
    public void deleteExternalTransfer(String id) {

        externalTransferRepo.deleteById(id);
    }

    @Override
    public Page<ExternalTransfer> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return externalTransferRepo.findAll(pageable);
    }
/*

    @Override
    public void ExportExternalTransferToCsv(HttpServletResponse servletResponse) throws IOException {
        List<ExternalTransfer> externals = externalTransferRepo.findAll();

        String filename = "Products.csv";
        String csvContent = ConvertProductsToCsv(externals);

        servletResponse.setContentType("text/csv");
        servletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + filename);

        servletResponse.getOutputStream().print(csvContent);
    }

    @Override
    public String ConvertProductsToCsv(List<ExternalTransfer> externals) throws IOException {
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

*/
@Override
public List<ExternalTransfer> searchExternals(Float price, String locationCode) {

    if (price == null && locationCode == null) {
        // If no criteria is provided, return all prods
        return externalTransferRepo.findAll();
    } else if (price != null && locationCode == null) {
        // If only name criteria is provided, search by taxRate
        return externalTransferRepo.findByPrice(price);
    } else if (price == null && locationCode != null) {
        // If only city criteria is provided, search by category
        return externalTransferRepo.findByLocationCodeContainingIgnoreCase(locationCode);
    } else {
        // If both taxRate and category criteria are provided, search by both
        return externalTransferRepo.findByPriceAndLocationCodeContainingIgnoreCase(price, locationCode);
    }

}
}
