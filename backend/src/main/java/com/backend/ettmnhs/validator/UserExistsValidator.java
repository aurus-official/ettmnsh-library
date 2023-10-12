package com.backend.ettmnhs.validator;

import com.backend.ettmnhs.user.User;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.ettmnhs.repository.UserRepository;

public class UserExistsValidator implements ConstraintValidator<UserExistsConstraint, String> {

    @Autowired
    private UserRepository userRepository;

    UserExistsValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void initialize(UserExistsConstraint userExistsConstraint) {
    }
    

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        System.out.println("Hello," + username);
        List<User> listOfUser = this.userRepository.findByUsername(username);
        if (listOfUser.size() != 0 && username.isBlank()) {
            return false;
        }
        return true;
    }
}
