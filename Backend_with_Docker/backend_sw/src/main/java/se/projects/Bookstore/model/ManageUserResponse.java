package se.projects.Bookstore.model;

import lombok.Getter;
import lombok.Setter;
import se.projects.Bookstore.enums.Role;

@Setter
@Getter
public class ManageUserResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private Role role;
}
