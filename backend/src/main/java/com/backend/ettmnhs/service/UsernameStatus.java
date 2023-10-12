package com.backend.ettmnhs.service;

import java.util.HashMap;

public class UsernameStatus extends BaseStatus{

    public UsernameStatus() {
        super.statusMap = new HashMap<Status, String>();
        super.statusMap.put(Status.BLANK, "* USERNAME IS BLANK!");
        super.statusMap.put(Status.HAS_SPACE, "* USERNAME HAS SPACE!");
        super.statusMap.put(Status.MAX_CHAR_REACHED, "* USERNAME IS TOO LONG! (MAX : 20 CHAR)");
        super.statusMap.put(Status.HAS_EXISTED, "* USERNAME HAS ALREADY EXISTED!");
        super.statusMap.put(Status.VALID, "* USERNAME IS VALID!");
    }
}
