package com.backend.ettmnhs.service;

import java.util.Map;

enum Status {
    BLANK,
    MAX_CHAR_REACHED,
    MIN_CHAR_NOT_REACHED,
    HAS_SPACE,
    HAS_EXISTED,
    UNMATCHED,
    VALID,
}

abstract class BaseStatus {
    public Map<Status, String> statusMap;

    public String getFeedback(Status status) {
        if (this.statusMap.containsKey(status)) {
            return this.statusMap.get(status);
        }
        return "An Error Occured!";
    }

    public String getColor(String remark) {
        if (statusMap.get(Status.VALID).compareTo(remark) != 0) {
            return "red";
        }
        return "#8cfa8c";
    }
}
