package com.example.agrotechsolutions.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Document(collection = "Contract")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Contract {
    @Id
   // Contract Number (integer, 12 digits)
    private Integer contractNo;

    // Creation Date of the contract
    private Date creationDate;

    // IDK field (24 characters)
    private String idk;

    // Last Modification Date of the contract
    private Date lastModDate;

    // Replication Date Time
    private Date replicationDateTime;

    // Replica Source ID
    private Date replicaSourceId;

    // OM Customers IDK field (24 characters)
    private String omCustomersIdk;

    // Protein Brokers IDK field (24 characters)
    private String proteinBrokersIdk;

    // Protein Buyers IDK field (24 characters)
    private String proteinBuyersIdk;

    // Contract Date
    private Date contractDate;

    // Expiration Date of the contract
    private Date expirationDate;

    private Date deliveryDate;

    private boolean closedFlag ;

    // Units (decimal, 10 digits)
    private BigDecimal units;

    // Unit Price (decimal, 4 digits before and 4 digits after decimal point)
    private BigDecimal unitPrice;

    // Price (decimal, 8 digits before and 8 digits after decimal point)
    private BigDecimal price;

    // Post Status (boolean)
    private Boolean postStatus;

    // Void Flag (boolean)
    private Boolean voidFlag;

    // Comments (nvarchar, 2000 characters)
    private String comments;

    // Freight Type (integer)
    private Integer freightType;

    // Post Date
    private Date postDate;

    // Price Mode (integer)
    private Integer priceMode;

    // OM Contracts Inventory Recv IDK field (string)
    private String omContractsInventoryRecvIdk;

    // Protein Products Sales IDK field (string)
    private String proteinProductsSalesIdk;

    // URL Value (nvarchar)
    private String urlValue;

    // External ID (string)
    private String externalId;

    // Creation User ID (string)
    private String creationUserId;

    // User ID (string)
    private String userId;

    // Tolerance Percent (decimal, 8 digits before and 8 digits after decimal point)
    private BigDecimal tolerancePercent;

    // Create Orders Flag (boolean)
    private Boolean createOrdersFlag;
    // Closed Date
    private Date closedDate;
    private Vendor vendor;
    private List<Product> products;

}
