package com.example.agrotechsolutions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AgroTechSolutionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgroTechSolutionsApplication.class, args);
    }

}
