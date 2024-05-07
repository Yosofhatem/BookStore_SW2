package se.projects.Bookstore.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.User;
import se.projects.Bookstore.enums.Role;
import se.projects.Bookstore.model.ManageUserResponse;
import se.projects.Bookstore.repository.CartItemRepository;
import se.projects.Bookstore.repository.CartRepository;
import se.projects.Bookstore.repository.TokenRepository;
import se.projects.Bookstore.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ManageUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    AuthService authService;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    public List<ManageUserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .filter(user -> user.getRole().equals(Role.USER))
                .map(this::convertToManageUserOrAdminResponse)
                .collect(Collectors.toList());
    }

    public List<ManageUserResponse> getAllAdmins() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .filter(user -> user.getRole().equals(Role.ADMIN))
                .map(this::convertToManageUserOrAdminResponse)
                .collect(Collectors.toList());
    }

    public ManageUserResponse getUserOrAdmin(int id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return convertToManageUserOrAdminResponse(user);
        } else {
            return null;
        }
    }

    public void deleteUserOrAdmin(int id) {
        User user = userRepository.findById(id).orElse(null);
        System.out.println("user is " + user);
        if (user != null) {
            cartItemRepository.deleteById(id);
            cartRepository.deleteById(id);
            tokenRepository.deleteByUser(user);
            userRepository.delete(user);
        } else {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
    }

    public void addNewUser(User user) {
        user.setRole(Role.USER);
        authService.register(user);
    }

    public void addNewAdmin(User user) {
        user.setRole(Role.ADMIN);
        authService.register(user);
    }

    private ManageUserResponse convertToManageUserOrAdminResponse(User user) {
        ManageUserResponse response = new ManageUserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        return response;
    }
}