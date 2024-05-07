package se.projects.Bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.projects.Bookstore.entity.User;
import se.projects.Bookstore.model.ManageUserResponse;
import se.projects.Bookstore.service.ManageUserService;

import java.util.List;

@RestController
@RequestMapping("api/books")
public class ManageUserController {

    @Autowired
    ManageUserService manageUserService;

    @GetMapping("/get_all_users")
    public List<ManageUserResponse> getAllUsers() {
        return manageUserService.getAllUsers();
    }

    @GetMapping("/get_all_admins")
    public List<ManageUserResponse> getAllAdmins() {
        return manageUserService.getAllAdmins();
    }

    @GetMapping("/get_user/{id}")
    public ManageUserResponse getUser(@PathVariable int id) {
        return manageUserService.getUserOrAdmin(id);
    }

    @DeleteMapping("/delete_user/{id}")
    public void deleteUser(@PathVariable int id) {
        manageUserService.deleteUserOrAdmin(id);
    }

    @PostMapping("/add_new_user")
    public void addNewUser(@RequestBody User user) {
        manageUserService.addNewUser(user);
    }

    @PostMapping("/add_new_admin")
    public void addNewAdmin(@RequestBody User user) {
        manageUserService.addNewAdmin(user);
    }
}