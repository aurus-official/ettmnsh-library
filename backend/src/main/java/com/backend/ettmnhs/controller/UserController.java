package com.backend.ettmnhs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.backend.ettmnhs.user.User;
import com.backend.ettmnhs.service.UserService;
import com.backend.ettmnhs.service.UserValidationRemark;


@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/user")
    ResponseEntity<UserValidationRemark> newUser(@RequestBody User newUser) {
        UserValidationRemark feedback = new UserValidationRemark();
        this.userService.validateUsername(newUser, feedback);
        this.userService.validatePassword(newUser, feedback);
        this.userService.validateConfirmPassword(newUser, feedback);
        this.userService.postToDatabase(newUser, feedback);
        this.userService.getColorLabel(feedback);
        return new ResponseEntity<>(feedback, HttpStatus.BAD_REQUEST);
    }
}
