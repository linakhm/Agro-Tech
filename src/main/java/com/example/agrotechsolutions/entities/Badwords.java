package com.example.agrotechsolutions.entities;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import static com.example.agrotechsolutions.entities.Vendor.BAD_WORDS;
public final class Badwords implements ConstraintValidator<Badword, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        for (String badWord : BAD_WORDS) {
            if (value.toLowerCase().contains(badWord)) {
                return false;
            }
        }

        return !value.trim().isEmpty();
    }
}
