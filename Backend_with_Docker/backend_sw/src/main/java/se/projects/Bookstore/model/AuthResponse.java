package se.projects.Bookstore.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private final String token;
    private final String message;

    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }
}
