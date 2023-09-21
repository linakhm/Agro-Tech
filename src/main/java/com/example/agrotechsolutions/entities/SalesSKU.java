package com.example.agrotechsolutions.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "SalesSKU")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SalesSKU {

    @Id
    private String id;
    private String code;
    private String name;
    private Sales sales;


}
