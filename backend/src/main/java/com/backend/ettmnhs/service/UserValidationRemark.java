package com.backend.ettmnhs.service;

import com.backend.ettmnhs.user.User;


public class UserValidationRemark extends User {

    private String usernameColorLabel;
    private String passwordColorLabel;
    private String confpasswordColorLabel;

    public String getUsernameColorLabel() {
        return usernameColorLabel;
    }

    public void setUsernameColorLabel(String usernameColorLabel) {
        this.usernameColorLabel = usernameColorLabel;
    }

    public String getPasswordColorLabel() {
        return passwordColorLabel;
    }

    public void setPasswordColorLabel(String passwordColorLabel) {
        this.passwordColorLabel = passwordColorLabel;
    }

    public String getConfpasswordColorLabel() {
        return confpasswordColorLabel;
    }

    public void setConfpasswordColorLabel(String confpasswordColorLabel) {
        this.confpasswordColorLabel = confpasswordColorLabel;
    }
}
