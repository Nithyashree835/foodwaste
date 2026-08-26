package com.foodwaste.controller;

import com.foodwaste.model.Donation;
import com.foodwaste.repository.DonationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})
public class DonationController {

    private final DonationRepository donationRepository;

    public DonationController(
            DonationRepository donationRepository) {

        this.donationRepository = donationRepository;
    }


    // ==========================================
    // GET ALL DONATIONS
    // ==========================================

    @GetMapping
    public List<Donation> getAllDonations() {

        return donationRepository.getAllDonations();
    }

    // ==========================================
// GET ALL DONATIONS FOR ADMIN
// ==========================================

    @GetMapping("/admin/all")
    public List<Donation> getAllDonationsForAdmin() {

        return donationRepository
                .getAllDonationsForAdmin();
    }


    // ==========================================
    // ADD DONATION
    // ==========================================

    @PostMapping
    public String addDonation(
            @RequestBody Donation donation) {

        int result =
                donationRepository.addDonation(donation);

        if (result > 0) {
            return "Donation added successfully";
        }

        return "Failed to add donation";
    }


    // ==========================================
    // MY DONATIONS
    // ==========================================

    @GetMapping("/my/{userId}")
    public List<Donation> getMyDonations(
            @PathVariable int userId) {

        return donationRepository
                .getDonationsByDonor(userId);
    }


    // ==========================================
    // MY CLAIMS
    // ==========================================

    @GetMapping("/claims/{userId}")
    public List<Donation> getMyClaims(
            @PathVariable int userId) {

        return donationRepository
                .getClaimsByUser(userId);
    }


    // ==========================================
    // CLAIM DONATION
    // ==========================================

    @PutMapping("/{id}/claim")
    public String claimDonation(
            @PathVariable int id,
            @RequestParam int userId) {

        int result =
                donationRepository.claimDonation(
                        id,
                        userId
                );

        if (result > 0) {
            return "Donation claimed successfully";
        }

        return "You cannot claim your own donation or the donation is no longer available";
    }


    // ==========================================
    // UPDATE PICKUP STATUS
    // ==========================================

    @PutMapping("/{id}/pickup-status")
    public String updatePickupStatus(
            @PathVariable int id,
            @RequestParam int userId,
            @RequestBody Donation donation) {

        int result =
                donationRepository.updatePickupStatus(
                        id,
                        userId,
                        donation.getPickupStatus()
                );

        if (result > 0) {
            return "Pickup status updated successfully";
        }

        return "Invalid pickup status, invalid status transition, or you are not the claimant";
    }


    // ==========================================
    // UPDATE DONATION STATUS
    // ==========================================

    @PutMapping("/{id}/status")
    public String updateDonationStatus(
            @PathVariable int id,
            @RequestBody Donation donation) {

        int result =
                donationRepository.updateStatus(
                        id,
                        donation.getStatus(),
                        donation.getClaimedBy()
                );

        if (result > 0) {
            return "Donation status updated successfully";
        }

        return "Donation not found";
    }


    // ==========================================
    // DELETE DONATION
    // ==========================================

    @DeleteMapping("/{id}")
    public String deleteDonation(
            @PathVariable int id) {

        int result =
                donationRepository.deleteDonation(id);

        if (result > 0) {
            return "Donation deleted successfully";
        }

        return "Donation not found";
    }
}