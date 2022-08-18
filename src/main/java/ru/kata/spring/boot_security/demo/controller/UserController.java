package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;


@Controller
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String showAllUsers(Model model) {
        model.addAttribute("newUser", new User());
        model.addAttribute("user", userService.getAuthenticatedUser());
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("listRoles", userService.getAllRoles());
        return "Admin";
    }

    @GetMapping("/user")
    public String showUser(Model model) {
        model.addAttribute("user", userService.getAuthenticatedUser());
        return "User";
    }

    @PostMapping("/admin/createUser")
    public String createUser(User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/admin/updateUser/{id}")
    public String updateUser(@ModelAttribute("updateUser") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/delete/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }


}
