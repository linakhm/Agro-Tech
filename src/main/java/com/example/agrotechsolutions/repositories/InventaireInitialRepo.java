package com.example.agrotechsolutions.repositories;


import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventaireInitialRepo extends MongoRepository<InventaireInitial, String> {
    Page<InventaireInitial> findByIsDeletedAndNomDuProduitContainingIgnoreCase(Boolean isDeleted, String NomDuProduit, Pageable pageable);
    List<InventaireInitial> findByIsDeleted(boolean isDeleted);
    List<InventaireInitial> findByNomDuProduitContainingIgnoreCase(String nomDuProduit);
    List<InventaireInitial> findByPrixUnitaire(Float prixunitaire);
    List<InventaireInitial> findByPrixUnitaireAndNomDuProduitContainingIgnoreCase(Float prixunitaire, String nomDuProduit);
}
