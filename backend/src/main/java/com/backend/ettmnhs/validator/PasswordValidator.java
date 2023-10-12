package com.backend.ettmnhs.validator;

import com.backend.ettmnhs.user.User;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint, User> {

    @Override
    public void initialize(PasswordConstraint passwordconstraint) {

    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        String password = user.getPassword();
        String confirmedpassword = user.getConfirmedpassword();
        System.out.println(String.format("Password : %s", password));
        System.out.println(String.format("Confirm Password : %s", confirmedpassword));
        if (password.compareTo(confirmedpassword) == 0) {
            return true;
        }
        System.out.println("Passwords aren't match!");
        return false;
    }
}
