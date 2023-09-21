package com.example.agrotechsolutions.controllers;


import com.example.agrotechsolutions.entities.Product;
import com.example.agrotechsolutions.services.ProductServices;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {


    @Autowired
    ProductServices productServices;

    @GetMapping("/productslist")

    public ResponseEntity<Page<Product>> getProductssPage(

            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size)
    //  @RequestParam(defaultValue = "name") String sortField,
    // @RequestParam(defaultValue = "asc") String sortDir)
    {
        {

            // Retrieve the paginated and sorted list
            Page<Product> productPage = productServices.findAll(page, size);
            // Return the list of vendors with HTTP status 200 OK
            return ResponseEntity.ok().body(productPage);

        }

    }

    @GetMapping("/Products-Csv")
    public void ExportProductsToCsv(HttpServletResponse servletResponse) throws java.io.IOException {
        productServices.ExportProductsToCsv(servletResponse);

    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product product) {
        return productServices.addProduct(product);

    }

    @PutMapping("/updateProduct/{id}")
    @ResponseBody
    public Map<String, Object> updateProduct(@PathVariable("id") String id, @RequestBody Product product) {
        Product updatedProduct = productServices.updateProduct(id, product);
        Map<String, Object> response = new HashMap<>();
        response.put("vendor", updatedProduct);
        return response;

    }

    @DeleteMapping("/deleteProduct/{id}")

    public void deleteProduct(@PathVariable("id") String id) {
        productServices.deleteProduct(id);

    }

    @GetMapping("/getProductById/{id}")
    public Product GetVendorById(@PathVariable("id") String id) {
        return productServices.retrieveProductById(id);
    }

    @GetMapping("/searchProducts")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) Float taxRate,
            @RequestParam(required = false) String category) {
        List<Product> products = productServices.searchProducts(taxRate, category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/importProdCSV")
    @ResponseBody
    public ResponseEntity<Void> importCSV(@RequestBody MultipartFile file) {
        try {
            // Create a CSVReader with the uploaded CSV file
            Reader reader = new InputStreamReader(file.getInputStream());
            CSVReader csvReader = new CSVReader(reader);

            // Read all the rows from the CSV file
            List<String[]> rows = csvReader.readAll();

            // Process each row of data
            for (String[] row : rows) {
                // Access individual cells in the row using the row array
                String name = row[0];
                String email = row[1];
                String type = row[2];
                String phone = row[3];
                String cityName = row[4];
                String currencyCode = row[5];
                String shippingAddress = row[6];
                // save the data to the database
                System.out.println("Name: " + name);
                System.out.println("Email: " + email);
                System.out.println("Type: " + type);
                System.out.println("Phone: " + phone);
                System.out.println("CityName: " + cityName);
                System.out.println("CurrencyCode: " + currencyCode);
                System.out.println("ShippingAddress: " + shippingAddress);

            }
            // Close the CSVReader
            csvReader.close();
            log.info("*********************imporrt called in backend");
            // Return a success response
            return ResponseEntity.ok().build();
        } catch (IOException | CsvException e) {
            // Handle any exceptions that may occur during CSV processing
            e.printStackTrace();
            // Return an error response if needed
            return ResponseEntity.status(500).build();
        }
    }


    @PostMapping("/archiver/{id}")
    public void archiveProduct(@PathVariable String id) {
        productServices.archiveProduct(id);
    }

    @PostMapping("/desarchiver/{id}")
    public void disArchiveProduct(@PathVariable String id) {
        productServices.disArchiveProduct(id);
    }

    @GetMapping("/getArchived")
    public Page<Product> getArchivedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productServices.getArchivedProducts(pageable);
    }
}