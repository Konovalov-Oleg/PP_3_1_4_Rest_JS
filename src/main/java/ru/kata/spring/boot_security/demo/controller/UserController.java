package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        model.addAttribute("allUsers", userService.getAllUsers());
        return "AllUsers";
    }

    @GetMapping("/user")
    public String showUser(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        org.springframework.security.core.userdetails.User personDetails =
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        model.addAttribute("user", userService.getUserByEmail(personDetails.getUsername()));
        return "User";
    }

    @GetMapping("/admin/addUser")
    public String addNewUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("listRoles", userService.getAllRoles());
        return "AddNewUser";
    }

    @PostMapping("/admin/createUser")
    public String createUser(User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/edit/{id}")
    public String editUser(@PathVariable("id") long id, Model model) {
        User user = userService.getUserById(id);
        user.setPassword(null);
        model.addAttribute("user", user);
        model.addAttribute("listRoles", userService.getAllRoles());
        return "UpdateUser";
    }

    @PatchMapping("/admin/updateUser/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/delete/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }


}
