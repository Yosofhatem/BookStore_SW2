package se.projects.Bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.Cart;
import se.projects.Bookstore.entity.Token;
import se.projects.Bookstore.entity.User;
import se.projects.Bookstore.model.AuthResponse;
import se.projects.Bookstore.repository.CartRepository;
import se.projects.Bookstore.repository.TokenRepository;
import se.projects.Bookstore.repository.UserRepository;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;

    @Autowired
    CartRepository cartRepository;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, TokenRepository tokenRepository, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(User request) {
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse(null, "Username already exists");
        }

        if (!isValidEmail(request.getUsername())) {
            return new AuthResponse(null, "Invalid email format");
        }

        if (!isValidPassword(request.getPassword())) {
            return new AuthResponse(null, "Password must be at least 6 characters");
        }

        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse(null, "Email already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user = repository.save(user);
        String jwt = jwtService.generateToken(user);

        saveUserToken(jwt, user);

        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);

        return new AuthResponse(jwt, "User registration was successful");
    }

    public AuthResponse authenticate(User request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = repository.findByUsername(request.getUsername()).orElseThrow();
            String jwt = jwtService.generateToken(user);

            revokeAllTokenByUser(user);
            saveUserToken(jwt, user);

            return new AuthResponse(jwt, "User login was successful");
        } catch (Exception ex) {
            return new AuthResponse(null, "Email or password is wrong");
        }
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t -> {
            t.setLoggedOut(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    private boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        String emailRegex = "^[a-zA-Z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$";
        return email.matches(emailRegex);
    }

    private boolean isValidPassword(String password) {
        if (password == null || password.length() < 6 || password.length() > 15) {
            return false;
        }
        String passwordRegex = "^[a-zA-Z0-9]+$";
        return password.matches(passwordRegex);
    }
}
