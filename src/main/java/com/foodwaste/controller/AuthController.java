package com.foodwaste.controller;

import com.foodwaste.model.User;
import com.foodwaste.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        try {

            // Check required fields
            if (user.getName() == null ||
                    user.getName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Name is required");
            }


            if (user.getEmail() == null ||
                    user.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }


            if (user.getPassword() == null ||
                    user.getPassword().length() < 6) {

                return ResponseEntity
                        .badRequest()
                        .body("Password must contain at least 6 characters");
            }


            if (user.getRole() == null ||
                    user.getRole().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Role is required");
            }


            // ==========================================
            // CHECK EXISTING EMAIL
            // ==========================================

            User existingUser =
                    userRepository.findByEmail(
                            user.getEmail()
                    );

            if (existingUser != null) {

                return ResponseEntity
                        .badRequest()
                        .body("Email already registered");
            }


            // ==========================================
            // VALIDATE ROLE
            // ==========================================

            if (!user.getRole().equals("DONOR") &&
                    !user.getRole().equals("NGO")) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid role");
            }


            // ==========================================
            // NGO VALIDATION
            // ==========================================

            if (user.getRole().equals("NGO")) {

                if (user.getOrganizationName() == null ||
                        user.getOrganizationName().trim().isEmpty()) {

                    return ResponseEntity
                            .badRequest()
                            .body("Organization name is required");
                }

                if (user.getOrganizationType() == null ||
                        user.getOrganizationType().trim().isEmpty()) {

                    return ResponseEntity
                            .badRequest()
                            .body("Organization type is required");
                }
            }


            // ==========================================
            // ENCRYPT PASSWORD
            // ==========================================

            user.setPassword(
                    passwordEncoder.encode(
                            user.getPassword()
                    )
            );


            // ==========================================
            // SAVE USER
            // ==========================================

            int result =
                    userRepository.registerUser(user);


            if (result > 0) {

                return ResponseEntity
                        .ok("Registration successful!");
            }


            return ResponseEntity
                    .internalServerError()
                    .body("Registration failed");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Registration error: "
                                    + e.getMessage()
                    );
        }
    }


    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        User user =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }


        // ==========================================
        // CHECK PASSWORD
        // ==========================================

        boolean passwordMatches =
                passwordEncoder.matches(
                        loginUser.getPassword(),
                        user.getPassword()
                );


        if (!passwordMatches) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }


        return ResponseEntity.ok(user);
    }
}