package com.example.agrotechsolutions.entities;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private String id;
    private String code;
    private String name;
    private ProductType type;
    private Boolean  status;

    private String currency;
    private String inventory;
    private Boolean medicated;
    private String  manufacturer;
    private String color;
    private ProductUsage productusage;
    private String maxOver;
    private float prixUnitaireHt;

    private float prixUnitaireTtc;
    private float taxRate;

    private  Category category;
    private VendorSKU vendorSku; // Embedded VendorSKU object for this product

    private  SalesSKU salesSKU;

    private List<Contract> contracts;


}
