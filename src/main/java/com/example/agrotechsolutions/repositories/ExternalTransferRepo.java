package com.example.agrotechsolutions.repositories;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExternalTransferRepo extends MongoRepository<ExternalTransfer, String> {
    List<ExternalTransfer> findByPrice(float price);
    List<ExternalTransfer> findByLocationCodeContainingIgnoreCase(String category);
    List<ExternalTransfer> findByPriceAndLocationCodeContainingIgnoreCase(float taxRate, String category);


}
