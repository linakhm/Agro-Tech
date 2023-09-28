package com.example.agrotechsolutions.repositories;

import com.example.agrotechsolutions.entities.Category;
import com.example.agrotechsolutions.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.mongodb.repository.Query;


@Repository
public interface ProductRepo extends MongoRepository<Product,String > {

    List<Product> findByTaxRate(float taxRate);
    List<Product> findByCategoryContainingIgnoreCase(String category);
    List<Product> findByTaxRateAndCategoryContainingIgnoreCase(float taxRate, String category);

    @Query(value = "{ 'status': false }")
    Page<Product> findByStatusFalse(Pageable pageable); // Assuming 'status' is a field in your Product entity


}
