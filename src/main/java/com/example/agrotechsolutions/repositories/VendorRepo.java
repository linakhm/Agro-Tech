package com.example.agrotechsolutions.repositories;

import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VendorRepo extends MongoRepository<Vendor,String > {

    List<Vendor> findByNameContainingIgnoreCase(String name);
    List<Vendor> findByNameCityContainingIgnoreCase(String city);
    List<Vendor> findByNameContainingIgnoreCaseAndNameCityContainingIgnoreCase(String name, String nameCity);
    Page <Vendor> findByIsDeletedAndNameContainingIgnoreCase(Boolean isDeleted,String Name,Pageable pageable);
    List<Vendor> findByIsDeleted(boolean isDeleted);

}
