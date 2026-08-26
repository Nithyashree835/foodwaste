package com.foodwaste.controller;

import com.foodwaste.model.Donation;
import com.foodwaste.repository.DonationRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    // =========================================================
    // GET ALL AVAILABLE DONATIONS
    // GET /api/donations
    // =========================================================

    @GetMapping
    public List<Donation> getAllDonations() {

        return donationRepository.getAllDonations();
    }


    // =========================================================
    // GET ALL DONATIONS FOR ADMIN
    // GET /api/donations/admin/all
    // =========================================================

    @GetMapping("/admin/all")
    public List<Donation> getAllDonationsForAdmin() {

        return donationRepository
                .getAllDonationsForAdmin();
    }


    // =========================================================
    // GET MY DONATIONS
    // GET /api/donations/my/{userId}
    // =========================================================

    @GetMapping("/my/{userId}")
    public List<Donation> getMyDonations(
            @PathVariable int userId) {

        return donationRepository
                .getDonationsByDonor(userId);
    }


    // =========================================================
    // GET MY CLAIMS
    // GET /api/donations/claims/{userId}
    // =========================================================

    @GetMapping("/claims/{userId}")
    public List<Donation> getMyClaims(
            @PathVariable int userId) {

        return donationRepository
                .getClaimsByUser(userId);
    }


    // =========================================================
    // GET SINGLE DONATION
    // GET /api/donations/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonationById(
            @PathVariable int id) {

        Donation donation =
                donationRepository.getDonationById(id);

        if (donation == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Donation not found");
        }

        return ResponseEntity.ok(donation);
    }


    // =========================================================
    // ADD DONATION
    // POST /api/donations
    // =========================================================

    @PostMapping
    public ResponseEntity<String> addDonation(
            @RequestBody Donation donation) {

        int result =
                donationRepository.addDonation(donation);

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation added successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Failed to add donation");
    }


    // =========================================================
    // CLAIM DONATION
    // PUT /api/donations/{id}/claim?userId=5
    // =========================================================

    @PutMapping("/{id}/claim")
    public ResponseEntity<String> claimDonation(
            @PathVariable int id,
            @RequestParam int userId) {

        int result =
                donationRepository.claimDonation(
                        id,
                        userId
                );

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation claimed successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        "You cannot claim your own donation " +
                                "or the donation is no longer available"
                );
    }


    // =========================================================
    // UPDATE PICKUP STATUS
    // PUT /api/donations/{id}/pickup-status?userId=5
    // =========================================================

    @PutMapping("/{id}/pickup-status")
    public ResponseEntity<String> updatePickupStatus(
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

            return ResponseEntity.ok(
                    "Pickup status updated successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        "Invalid pickup status, invalid " +
                                "status transition, or you are " +
                                "not the claimant"
                );
    }


    // =========================================================
    // MARK DONATION AS PICKED UP
    // PUT /api/donations/{id}/pickup?userId=5
    //
    // Used by DonationDetails.jsx
    // =========================================================

    @PutMapping("/{id}/pickup")
    public ResponseEntity<String> markPickedUp(
            @PathVariable int id,
            @RequestParam int userId) {

        int result =
                donationRepository.updatePickupStatus(
                        id,
                        userId,
                        "PICKED_UP"
                );

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation marked as picked up successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        "Unable to mark donation as picked up. " +
                                "Check the donation status and claimant."
                );
    }


    // =========================================================
    // MARK DONATION AS COMPLETED
    // PUT /api/donations/{id}/complete?userId=5
    //
    // Used by DonationDetails.jsx
    // =========================================================

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> markCompleted(
            @PathVariable int id,
            @RequestParam int userId) {

        int result =
                donationRepository.updatePickupStatus(
                        id,
                        userId,
                        "COMPLETED"
                );

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation completed successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        "Unable to complete donation. " +
                                "Check the donation status and claimant."
                );
    }


    // =========================================================
    // UPDATE DONATION STATUS
    // PUT /api/donations/{id}/status
    // =========================================================

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateDonationStatus(
            @PathVariable int id,
            @RequestBody Donation donation) {

        int result =
                donationRepository.updateStatus(
                        id,
                        donation.getStatus(),
                        donation.getClaimedBy()
                );

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation status updated successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Donation not found");
    }


    // =========================================================
    // DELETE DONATION
    // DELETE /api/donations/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonation(
            @PathVariable int id) {

        int result =
                donationRepository.deleteDonation(id);

        if (result > 0) {

            return ResponseEntity.ok(
                    "Donation deleted successfully"
            );
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Donation not found");
    }
}