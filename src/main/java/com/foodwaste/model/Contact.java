package com.foodwaste.model;

public class Contact {

    private int id;

    private String name;
    private String email;
    private String subject;
    private String message;
    private String createdAt;

    private String senderRole;

    // ID of the user sending the message
    private Integer senderId;

    // ID of the user receiving the message
    private Integer receiverId;

    // Donor ID when NGO contacts a donor
    private Integer donorId;

    private String type;


    // ==========================================
    // DEFAULT CONSTRUCTOR
    // ==========================================

    public Contact() {
    }


    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Contact(
            String name,
            String email,
            String subject,
            String message
    ) {

        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
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
    // NAME
    // ==========================================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // ==========================================
    // EMAIL
    // ==========================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // ==========================================
    // SUBJECT
    // ==========================================

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }


    // ==========================================
    // MESSAGE
    // ==========================================

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    // ==========================================
    // CREATED AT
    // ==========================================

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }


    // ==========================================
    // SENDER ROLE
    // ==========================================

    public String getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(String senderRole) {
        this.senderRole = senderRole;
    }


    // ==========================================
    // SENDER ID
    // ==========================================

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }


    // ==========================================
    // RECEIVER ID
    // ==========================================

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }


    // ==========================================
    // DONOR ID
    // ==========================================

    public Integer getDonorId() {
        return donorId;
    }

    public void setDonorId(Integer donorId) {
        this.donorId = donorId;
    }


    // ==========================================
    // TYPE
    // ==========================================

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}