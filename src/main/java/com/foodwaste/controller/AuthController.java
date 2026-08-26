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
        "http://localhost:5175"
})
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        User user = userRepository.findByEmail(
                loginUser.getEmail()
        );

        if (user == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        // Check plain password against BCrypt hash
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