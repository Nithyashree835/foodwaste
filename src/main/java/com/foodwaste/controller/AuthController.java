package com.foodwaste.controller;

import com.foodwaste.model.User;
import com.foodwaste.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    public AuthController(UserRepository userRepository) {

        this.userRepository = userRepository;
    }


    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public String register(
            @RequestBody User user) {

        System.out.println(
                "Register request: "
                        + user.getName()
                        + " | "
                        + user.getEmail()
                        + " | "
                        + user.getRole()
        );


        // Check email

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );


        if (existingUser != null) {

            return "Email already registered";
        }


        // Validate role

        if (user.getRole() == null ||
                (
                        !user.getRole().equals("DONOR") &&
                                !user.getRole().equals("NGO")
                )) {

            return "Invalid role";
        }


        // Encrypt password

        String hashedPassword =
                passwordEncoder.encode(
                        user.getPassword()
                );


        user.setPassword(
                hashedPassword
        );


        // Save user

        int result =
                userRepository.registerUser(
                        user
                );


        if (result > 0) {

            return "Registration successful";
        }


        return "Registration failed";
    }


    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public User login(
            @RequestBody User user) {


        System.out.println(
                "Login email: "
                        + user.getEmail()
        );


        User existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );


        if (existingUser == null) {

            System.out.println(
                    "USER NOT FOUND"
            );

            return null;
        }


        // Check password

        boolean passwordMatches =
                passwordEncoder.matches(
                        user.getPassword(),
                        existingUser.getPassword()
                );


        if (!passwordMatches) {

            System.out.println(
                    "PASSWORD DOES NOT MATCH"
            );

            return null;
        }


        System.out.println(
                "LOGIN SUCCESS"
        );


        System.out.println(
                "ROLE: "
                        + existingUser.getRole()
        );


        // Never send password to React

        existingUser.setPassword(null);


        return existingUser;
    }
}