package com.foodwaste.controller;

import com.foodwaste.model.User;
import com.foodwaste.model.DonationRequest;

import com.foodwaste.repository.UserRepository;
import com.foodwaste.repository.DonationRepository;
import com.foodwaste.repository.DonationRequestRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    private final DonationRepository donationRepository;

    private final DonationRequestRepository donationRequestRepository;


    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public AdminController(
            UserRepository userRepository,
            DonationRepository donationRepository,
            DonationRequestRepository donationRequestRepository) {

        this.userRepository = userRepository;

        this.donationRepository = donationRepository;

        this.donationRequestRepository =
                donationRequestRepository;
    }


    // ==========================================
    // GET ALL USERS
    // ==========================================

    @GetMapping("/users")
    public List<User> getAllUsers() {

        return userRepository.getAllUsers();
    }


    // ==========================================
    // DELETE USER
    // ==========================================

    @DeleteMapping("/users/{id}")
    public String deleteUser(
            @PathVariable int id) {

        int result =
                userRepository.deleteUser(id);

        if (result > 0) {

            return "User deleted successfully";
        }

        return "User not found or cannot delete ADMIN";
    }


    // ==========================================
    // DELETE DONATION
    // ==========================================

    @DeleteMapping("/donations/{id}")
    public String deleteDonation(
            @PathVariable int id) {

        int result =
                donationRepository.deleteDonation(id);

        if (result > 0) {

            return "Donation deleted successfully";
        }

        return "Donation not found";
    }


    // ==========================================
    // GET ALL DONATION REQUESTS
    // ==========================================

    @GetMapping("/requests")
    public List<DonationRequest> getAllRequests() {

        return donationRequestRepository
                .getAllRequests();
    }
}