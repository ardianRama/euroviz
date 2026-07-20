package org.ardian.eurovizbackend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WorldBankApiException.class)
    public ResponseEntity<ErrorResponse> handleWorldBankApiException(WorldBankApiException e) {
        log.error("Failed to fetch data from World Bank API for country '{}'", e.getCountryCode(), e);

        ErrorResponse errorResponse = new ErrorResponse(
                "Could not fetch data from World Bank API",
                HttpStatus.BAD_GATEWAY.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(errorResponse);
    }
}
