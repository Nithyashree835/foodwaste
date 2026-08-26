package com.foodwaste.controller;

import com.foodwaste.model.DonationRequest;
import com.foodwaste.repository.DonationRequestRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})
public class DonationRequestController {

    private final DonationRequestRepository requestRepository;

    public DonationRequestController(
            DonationRequestRepository requestRepository) {

        this.requestRepository = requestRepository;
    }


    // ==========================================
    // GET REQUESTS FOR DONOR
    // ==========================================

    @GetMapping("/donor/{donorId}")
    public List<DonationRequest> getDonorRequests(
            @PathVariable int donorId) {

        return requestRepository
                .getRequestsByDonor(donorId);
    }


    // ==========================================
    // GET REQUESTS FOR NGO
    // ==========================================

    @GetMapping("/ngo/{ngoId}")
    public List<DonationRequest> getNgoRequests(
            @PathVariable int ngoId) {

        return requestRepository
                .getRequestsByNgo(ngoId);
    }


    // ==========================================
    // CREATE DONATION REQUEST
    // ==========================================

    @PostMapping
    public String createRequest(
            @RequestBody DonationRequest request) {

        return requestRepository.createRequest(
                request.getDonationId(),
                request.getNgoId(),
                request.getRequestedQuantity()
        );
    }


    // ==========================================
    // APPROVE REQUEST
    // ==========================================

    @PutMapping("/{id}/approve")
    public String approveRequest(
            @PathVariable int id) {

        int result =
                requestRepository.approveRequest(id);

        if (result > 0) {
            return "Donation request approved successfully";
        }

        return "Unable to approve request";
    }


    // ==========================================
    // REJECT REQUEST
    // ==========================================

    @PutMapping("/{id}/reject")
    public String rejectRequest(
            @PathVariable int id) {

        int result =
                requestRepository.rejectRequest(id);

        if (result > 0) {
            return "Donation request rejected successfully";
        }

        return "Unable to reject request";
    }
}