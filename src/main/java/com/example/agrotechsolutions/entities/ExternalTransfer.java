package com.example.agrotechsolutions.entities;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Document(collection = "ExternalTransfer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExternalTransfer {

    @Id
    private String refNumber;

    private String transactionCode="Receiving";
    private LocalDate transactionDate;
    private String warehouseCode;
    //private String productType;
    //private String productCode;
    //private String productName;
    //private String externalSourceCostCenterCode;
    //private String externalCostCenterName;
    //private SourceCostCenterType externalSourceCostCenterType;
    private CostCenter externalSourceCostCenter;
    private int inventoryUnits;
    private double price;
    private double unitPrice;
    @Indexed(unique = true)
    private String lotCode;
    private String locationCode;
    private LocalDate eventDate=  LocalDate.now();
    private LocalDate expirationDate;
    private LocalTime time = LocalTime.now();
    private String comment;
    private Boolean isVoid;
    private Product product;

}
