package com.example.agrotechsolutions.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Document(collection = "ProductUsage")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductUsage {


    @Id
    private String id;

    private Date transactionDate;
    private String farmCode;
    private String houseCode;
}
