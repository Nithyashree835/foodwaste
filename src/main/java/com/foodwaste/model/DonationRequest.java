package com.foodwaste.model;

public class DonationRequest {

    private int id;

    private int donationId;

    private int ngoId;

    private String ngoName;

    private String donorName;

    private String foodName;

    private String category;

    private int quantity;

    private String unit;

    private int requestedQuantity;

    private String requestDate;

    private String status;

    private String pickupLocation;

    private String expiryDate;


    // ==========================================
    // DEFAULT CONSTRUCTOR
    // ==========================================

    public DonationRequest() {
    }


    // ==========================================
    // ID
    // ==========================================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    // ==========================================
    // DONATION ID
    // ==========================================

    public int getDonationId() {
        return donationId;
    }

    public void setDonationId(int donationId) {
        this.donationId = donationId;
    }


    // ==========================================
    // NGO ID
    // ==========================================

    public int getNgoId() {
        return ngoId;
    }

    public void setNgoId(int ngoId) {
        this.ngoId = ngoId;
    }


    // ==========================================
    // NGO NAME
    // ==========================================

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }


    // ==========================================
    // DONOR NAME
    // ==========================================

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }


    // ==========================================
    // FOOD NAME
    // ==========================================

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }


    // ==========================================
    // CATEGORY
    // ==========================================

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // ==========================================
    // QUANTITY
    // ==========================================

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    // ==========================================
    // UNIT
    // ==========================================

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }


    // ==========================================
    // REQUESTED QUANTITY
    // ==========================================

    public int getRequestedQuantity() {
        return requestedQuantity;
    }

    public void setRequestedQuantity(int requestedQuantity) {
        this.requestedQuantity = requestedQuantity;
    }


    // ==========================================
    // REQUEST DATE
    // ==========================================

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }


    // ==========================================
    // STATUS
    // ==========================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // ==========================================
    // PICKUP LOCATION
    // ==========================================

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }


    // ==========================================
    // EXPIRY DATE
    // ==========================================

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
}