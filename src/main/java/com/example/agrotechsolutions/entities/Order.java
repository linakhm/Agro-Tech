package com.example.agrotechsolutions.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "Order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Contract contract; //one to one
    private long idOrder;
    private LocalDate date;
    private float deliveryPrice;
    private OrderStatus orderstatus;
    private float totalItem;
}
