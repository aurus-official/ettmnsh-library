package com.backend.ettmnhs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.ettmnhs.repository.UserRepository;
import com.backend.ettmnhs.user.User;
import java.util.stream.*;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void getColorLabel(UserValidationRemark feedback) {
        UsernameStatus usernameStatus = new UsernameStatus();
        PasswordStatus passwordStatus = new PasswordStatus();
        ConfPassStatus confPassStatus = new ConfPassStatus();

        feedback.setUsernameColorLabel(usernameStatus.getColor(feedback.getUsername()));
        System.out.println(usernameStatus.getColor(feedback.getUsername()));
        feedback.setPasswordColorLabel(passwordStatus.getColor(feedback.getPassword()));
        feedback.setConfpasswordColorLabel(confPassStatus.getColor(feedback.getConfirmedpassword()));
    }

    public void postToDatabase(User user, UserValidationRemark feedback) {
        if (this.isValidationPassed(feedback)) {
            this.userRepository.save(user);
        }
    }
    
    public void validateUsername(User user, UserValidationRemark feedback) {
        String username = user.getUsername().trim().toLowerCase();
        UsernameStatus usernameStatus = new UsernameStatus();
        
        if (username.isBlank()) {
            feedback.setUsername(usernameStatus.getFeedback(Status.BLANK));
            return;
        }
        if (this.hasSpaceInUsername(username)) {
            feedback.setUsername(usernameStatus.getFeedback(Status.HAS_SPACE));
            return;
        }
        if (username.length() >= 20) {
            feedback.setUsername(usernameStatus.getFeedback(Status.MAX_CHAR_REACHED));
            return;
        }
        if (this.hasAlreadyExisted(username)) {
            feedback.setUsername(usernameStatus.getFeedback(Status.HAS_EXISTED));
            return;
        }
        feedback.setUsername(usernameStatus.getFeedback(Status.VALID));
    }

    public void validatePassword(User user, UserValidationRemark feedback) {
        String password = user.getPassword();
        PasswordStatus passwordStatus = new PasswordStatus();
        if (password.isBlank()) {
            feedback.setPassword(passwordStatus.getFeedback(Status.BLANK));
            return;
        } 
        if (this.hasMinimumChar(password)) {
            feedback.setPassword(passwordStatus.getFeedback(Status.MIN_CHAR_NOT_REACHED));
            return;
        }
        if (this.hasMaxChar(password)) {
            feedback.setPassword(passwordStatus.getFeedback(Status.MAX_CHAR_REACHED));
            return;
        }
        feedback.setPassword(passwordStatus.getFeedback(Status.VALID));
    }

    public void validateConfirmPassword(User user, UserValidationRemark feedback) {
        String password = user.getPassword();
        String confirmedpassword = user.getConfirmedpassword();
        ConfPassStatus confPassStatus = new ConfPassStatus();
        System.out.println(password);
        System.out.println(confirmedpassword);
        if (password.isBlank() || confirmedpassword.isBlank()) {
            feedback.setConfirmedpassword(confPassStatus.getFeedback(Status.BLANK));
            return;
        }
        if (this.notSameAsConfPassword(password, confirmedpassword)) {
            feedback.setConfirmedpassword(confPassStatus.getFeedback(Status.UNMATCHED));
            return;
        }
        feedback.setConfirmedpassword(confPassStatus.getFeedback(Status.VALID));
    }

    private boolean isValidationPassed(UserValidationRemark feedback) {
        String username = feedback.getUsername();
        String password = feedback.getPassword();
        String confirmedpassword = feedback.getConfirmedpassword();
        UsernameStatus usernameStatus = new UsernameStatus();
        PasswordStatus passwordStatus = new PasswordStatus();
        ConfPassStatus confPassStatus = new ConfPassStatus();
        boolean isUsernamePassed = username.compareTo(usernameStatus.getFeedback(Status.VALID)) == 0;
        boolean isPasswordPassed = password.compareTo(passwordStatus.getFeedback(Status.VALID)) == 0;
        boolean isConfirmedPasswordPassed = confirmedpassword.compareTo(confPassStatus.getFeedback(Status.VALID)) == 0;
        System.out.println(isUsernamePassed);
        System.out.println(isPasswordPassed);
        System.out.println(isConfirmedPasswordPassed);

        if (isUsernamePassed && isPasswordPassed && isConfirmedPasswordPassed) {
            System.out.println("* Passed Validation!");
            return true;
        }

        return false;
    }

    private boolean notSameAsConfPassword(String password, String confpassword) {
        if (password.compareTo(confpassword) == 0) {
            return false;
        }
        return true;
    }

    private boolean hasMinimumChar(String password) {
        if (password.length() >= 5) {
            return false;
        }
        return true;

    }

    private boolean hasMaxChar(String password) {
        if (password.length() > 15) {
            return true;
        }
        return false;
    }

    private boolean hasSpaceInUsername(String username) {
        String procesedString = String.join("", Stream.of(username.split(""))
            .filter(element -> !(element.isBlank()))
            .collect(Collectors.toList()));
        if (username.length() != procesedString.length()) {
            return true;
        }
        return false;
    }
    
    private boolean hasAlreadyExisted(String username) {
        List<User> listOfUser = this.userRepository.findByUsername(username);
        if (listOfUser.size() != 0) {
            return true;
        }
        return false;
    }
}
