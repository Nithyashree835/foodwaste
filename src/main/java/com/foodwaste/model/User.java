package com.foodwaste.model;

public class User {

    private int id;

    private String name;

    private String email;

    private String password;

    private String role;

    private String phone;

    private String address;

    private String organizationName;

    private String organizationType;


    // ==============================
    // DEFAULT CONSTRUCTOR
    // ==============================

    public User() {
    }


    // ==============================
    // CONSTRUCTOR
    // ==============================

    public User(
            int id,
            String name,
            String email,
            String password,
            String role,
            String phone,
            String address,
            String organizationName,
            String organizationType) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.organizationName = organizationName;
        this.organizationType = organizationType;
    }


    // ==============================
    // ID
    // ==============================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    // ==============================
    // NAME
    // ==============================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // ==============================
    // EMAIL
    // ==============================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // ==============================
    // PASSWORD
    // ==============================

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    // ==============================
    // ROLE
    // ==============================

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    // ==============================
    // PHONE
    // ==============================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // ==============================
    // ADDRESS
    // ==============================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    // ==============================
    // ORGANIZATION NAME
    // ==============================

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }


    // ==============================
    // ORGANIZATION TYPE
    // ==============================

    public String getOrganizationType() {
        return organizationType;
    }

    public void setOrganizationType(String organizationType) {
        this.organizationType = organizationType;
    }
}