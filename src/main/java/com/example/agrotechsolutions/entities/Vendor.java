package com.example.agrotechsolutions.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.List;

@Document(collection="Vendor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vendor {
    public static final List<String> BAD_WORDS = Arrays.asList("badword", "sobadword", "verybadword");

    @Id
    private String id;
    @Size(min = 4, max = 8, message = "Name should be between 4 and 8 characters")
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Type is required")

    private vendorType type;
    @Size(min = 4, max = 8, message = "Code should be between 4 and 8 characters")

    @NotBlank(message = "Code is required")

    private String currencyCode; // Currency code not exist in BE
    @NotBlank(message = "Payment term is required")

    private String paymentTerm;
    @NotBlank(message = "Address is required")


    private String address;
    @NotBlank(message = "Code city is required")


    private String codeCity;

    @NotBlank(message = "Name city is required")

    private String nameCity;

    @NotBlank(message = "Wilaya name is required")

    private String wilayaName;
    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only numbers")


    private String phone;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")

    private String email;
    @Badword
    @NotBlank(message = "Code is required")

    private String code ;
    //private VendorSKU vendorSku; // Embedded VendorSKU object for this vendor

    @NotBlank(message = "Shipping address is required")

    private String shippingAddress;
    @NotBlank(message = "Shipping city is required")

    private String shippingCity;

   // @DBRef not mandatory annotation
   private List<Contract> contracts;

   private Boolean isDeleted=false;


}
