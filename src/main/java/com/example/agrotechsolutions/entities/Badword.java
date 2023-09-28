package com.example.agrotechsolutions.entities;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = Badwords.class)
public @interface Badword {
    String message() default "Name contains bad word";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
