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
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            // ------------------------------------------
            // CHECK NAME
            // ------------------------------------------

            if (user.getName() == null ||
                    user.getName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Name is required");
            }

            // ------------------------------------------
            // CHECK EMAIL
            // ------------------------------------------

            if (user.getEmail() == null ||
                    user.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }

            String email = user.getEmail().trim();

            // ------------------------------------------
            // CHECK PASSWORD
            // ------------------------------------------

            if (user.getPassword() == null ||
                    user.getPassword().length() < 6) {

                return ResponseEntity
                        .badRequest()
                        .body("Password must contain at least 6 characters");
            }

            // ------------------------------------------
            // CHECK ROLE
            // ------------------------------------------

            if (user.getRole() == null ||
                    user.getRole().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Role is required");
            }

            String role = user.getRole().trim().toUpperCase();

            // ------------------------------------------
            // VALIDATE ROLE
            // ------------------------------------------

            if (!role.equals("DONOR") &&
                    !role.equals("NGO")) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid role");
            }

            // ------------------------------------------
            // CHECK EXISTING EMAIL
            // ------------------------------------------

            User existingUser =
                    userRepository.findByEmail(email);

            if (existingUser != null) {

                return ResponseEntity
                        .badRequest()
                        .body("Email already registered");
            }

            // ------------------------------------------
            // NGO VALIDATION
            // ------------------------------------------

            if (role.equals("NGO")) {

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

            // ------------------------------------------
            // SET CLEAN VALUES
            // ------------------------------------------

            user.setEmail(email);
            user.setRole(role);

            // ------------------------------------------
            // ENCRYPT PASSWORD
            // ------------------------------------------

            String encryptedPassword =
                    passwordEncoder.encode(
                            user.getPassword()
                    );

            user.setPassword(encryptedPassword);

            // ------------------------------------------
            // SAVE USER
            // ------------------------------------------

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
                                    + getErrorMessage(e)
                    );
        }
    }

    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        try {

            // ------------------------------------------
            // CHECK REQUEST
            // ------------------------------------------

            if (loginUser == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Login data is required");
            }

            // ------------------------------------------
            // CHECK EMAIL
            // ------------------------------------------

            if (loginUser.getEmail() == null ||
                    loginUser.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }

            // ------------------------------------------
            // CHECK PASSWORD
            // ------------------------------------------

            if (loginUser.getPassword() == null ||
                    loginUser.getPassword().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Password is required");
            }

            // ------------------------------------------
            // CLEAN EMAIL
            // ------------------------------------------

            String email =
                    loginUser.getEmail()
                            .trim();

            // ------------------------------------------
            // FIND USER
            // ------------------------------------------

            User user =
                    userRepository.findByEmail(email);

            // ------------------------------------------
            // USER NOT FOUND
            // ------------------------------------------

            if (user == null) {

                return ResponseEntity
                        .status(401)
                        .body("Invalid email or password");
            }

            // ------------------------------------------
            // CHECK DATABASE PASSWORD
            // ------------------------------------------

            if (user.getPassword() == null ||
                    user.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .status(500)
                        .body("Password is missing for this user");
            }

            // ------------------------------------------
            // CHECK PASSWORD
            // ------------------------------------------

            boolean passwordMatches =
                    passwordEncoder.matches(
                            loginUser.getPassword(),
                            user.getPassword()
                    );

            // ------------------------------------------
            // WRONG PASSWORD
            // ------------------------------------------

            if (!passwordMatches) {

                return ResponseEntity
                        .status(401)
                        .body("Invalid email or password");
            }

            // ------------------------------------------
            // LOGIN SUCCESS
            // ------------------------------------------

            return ResponseEntity.ok(user);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Login error: "
                                    + getErrorMessage(e)
                    );
        }
    }

    // ==========================================
    // ERROR MESSAGE
    // ==========================================

    private String getErrorMessage(Exception e) {

        if (e.getMessage() != null &&
                !e.getMessage().trim().isEmpty()) {

            return e.getMessage();
        }

        if (e.getCause() != null &&
                e.getCause().getMessage() != null) {

            return e.getCause().getMessage();
        }

        return "Unknown server error";
    }
}