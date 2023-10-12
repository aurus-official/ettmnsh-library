package com.backend.ettmnhs.service;

import java.util.HashMap;

public class ConfPassStatus extends BaseStatus {

    public ConfPassStatus() {
        super.statusMap = new HashMap<Status, String>();
        super.statusMap.put(Status.BLANK, "* PASSWORD IS BLANK!");
        super.statusMap.put(Status.UNMATCHED, "* PASSWORDS AREN'T MATCHED!");
        super.statusMap.put(Status.VALID, "* PASSWORDS MATCHED!");
    }
}
