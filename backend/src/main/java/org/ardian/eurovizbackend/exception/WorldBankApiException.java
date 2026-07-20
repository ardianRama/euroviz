package org.ardian.eurovizbackend.exception;

import lombok.Getter;

@Getter
public class WorldBankApiException extends RuntimeException {

    private final String countryCode;

    public WorldBankApiException(String message, String countryCode, Throwable cause) {
        super(message, cause);
        this.countryCode = countryCode;
    }

}
