package com.example.agrotechsolutions.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "VendorSKU")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VendorSKU {

    @Id
    private String idSKU;
    private String code;
    private String name;


}
