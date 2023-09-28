package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.Category;
import com.example.agrotechsolutions.entities.Product;
import com.example.agrotechsolutions.entities.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface ProductServices {


    //public List<Product> retrieveAllProducts();

    public Product addProduct(Product product);
    public Product updateProduct( String id,Product product);
    public Product retrieveProductById(String id);
    public void deleteProduct(String id);
    public Page<Product> findAll(int page, int size) ;
    public List<Product> searchProducts(Float taxRate, String category) ;

    public void ExportProductsToCsv(HttpServletResponse servletResponse) throws IOException;
    public String ConvertProductsToCsv(List<Product> products) throws IOException ;
    public void archiveProduct(String id) ;
    public void disArchiveProduct(String id) ;
    public Page<Product> getArchivedProducts(Pageable pageable) ;

//« ConvertProductsToCsv»
//«ExportProductsToCsv »




}
