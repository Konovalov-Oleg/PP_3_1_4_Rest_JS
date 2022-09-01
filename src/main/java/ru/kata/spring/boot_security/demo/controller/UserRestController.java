package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @GetMapping("/user")
    public User getAuthenticatedUser() {
        return userService.getAuthenticatedUser();
    }

    @PostMapping("/users")
    public List<User> addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return userService.getAllUsers();
    }

    @PutMapping("/users")
    public List<User> updateUser(@RequestBody User user) {
        userService.saveUser(user);
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public List<User> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return userService.getAllUsers();
    }
}
