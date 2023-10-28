package com.backend.ettmnhs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.backend.ettmnhs.user.User;
import com.backend.ettmnhs.research.Research;
import com.backend.ettmnhs.service.ResearchService;
import com.backend.ettmnhs.service.UserService;
import com.backend.ettmnhs.service.UserValidationRemark;
import com.backend.ettmnhs.research.Query;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.io.IOException;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResearchService researchService;

    public UserController(UserService userService, ResearchService researchService) {
        this.userService = userService;
        this.researchService = researchService;
    }

    private List<Research> researchList;

    @PostConstruct
    private void postConstruct() throws IOException {
        researchList = this.researchService.fetchAll();
    }

    @PostMapping("/signup")
    ResponseEntity<UserValidationRemark> newUser(@RequestBody User newUser) {
        UserValidationRemark feedback = new UserValidationRemark();
        this.userService.validateUsername(newUser, feedback);
        this.userService.validatePassword(newUser, feedback);
        this.userService.validateConfirmPassword(newUser, feedback);
        this.userService.getColorLabel(feedback);

        if (!(this.userService.isSignUpValidationPassed(feedback))) {
            return new ResponseEntity<>(feedback, HttpStatus.BAD_REQUEST);
        }

        this.userService.postToDatabase(newUser, feedback);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @PostMapping("/login")
    ResponseEntity<UserValidationRemark> login(@RequestBody User newUser) {
        UserValidationRemark feedback = new UserValidationRemark();
        if (!(this.userService.isLoginValidationPassed(newUser, feedback))) {
            return new ResponseEntity<>(feedback, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @PostMapping("/search")
    ResponseEntity<List<Research>> test(@RequestBody Query query) throws IOException {
        if (query.getInput().isBlank()) {
            return new ResponseEntity<>(researchList, HttpStatus.OK);
        }

        List<Research> filteredList = this.researchService.queryInput(query, researchList);
        return new ResponseEntity<>(filteredList, HttpStatus.OK);
    }
}
