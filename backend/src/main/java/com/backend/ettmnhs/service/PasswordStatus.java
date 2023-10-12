package com.backend.ettmnhs.service;

import java.util.HashMap;

public class PasswordStatus extends BaseStatus {

    public PasswordStatus() {
        super.statusMap = new HashMap<Status, String>();
        super.statusMap.put(Status.BLANK, "* PASSWORD IS BLANK!");
        super.statusMap.put(Status.MIN_CHAR_NOT_REACHED, "* PASSWORD IS LESS THAN 5 CHARS!");
        super.statusMap.put(Status.MAX_CHAR_REACHED, "* PASSWORD IS MORE THAN 15 CHARS!");
        super.statusMap.put(Status.VALID, "* PASSWORD IS VALID!");
    }

}
