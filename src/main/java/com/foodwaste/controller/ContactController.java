package com.foodwaste.controller;

import com.foodwaste.model.Contact;
import com.foodwaste.repository.ContactRepository;
import com.foodwaste.repository.NotificationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})

public class ContactController {

    private final ContactRepository contactRepository;
    private final NotificationRepository notificationRepository;


    public ContactController(
            ContactRepository contactRepository,
            NotificationRepository notificationRepository) {

        this.contactRepository = contactRepository;
        this.notificationRepository = notificationRepository;
    }


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    @PostMapping
    public ResponseEntity<String> submitContact(
            @RequestBody Contact contact) {

        System.out.println("=================================");
        System.out.println("CONTACT REQUEST");
        System.out.println("Sender ID   : " + contact.getSenderId());
        System.out.println("Receiver ID : " + contact.getReceiverId());
        System.out.println("Donor ID    : " + contact.getDonorId());
        System.out.println("Sender Role : " + contact.getSenderRole());
        System.out.println("Message     : " + contact.getMessage());
        System.out.println("=================================");


        // ==========================================
        // VALIDATE MESSAGE
        // ==========================================

        if (contact.getMessage() == null ||
                contact.getMessage().trim().isEmpty()) {

            return ResponseEntity.badRequest().body(
                    "Message cannot be empty"
            );
        }


        // ==========================================
        // VALIDATE SENDER
        // ==========================================

        if (contact.getSenderId() == null ||
                contact.getSenderId() <= 0) {

            return ResponseEntity.badRequest().body(
                    "Invalid sender ID"
            );
        }


        // ==========================================
        // VALIDATE RECEIVER
        // ==========================================

        if (contact.getReceiverId() == null ||
                contact.getReceiverId() <= 0) {

            return ResponseEntity.badRequest().body(
                    "Invalid receiver ID"
            );
        }


        // ==========================================
        // SAVE CONTACT
        // ==========================================

        int result =
                contactRepository.saveContact(contact);


        if (result <= 0) {

            return ResponseEntity.badRequest().body(
                    "Failed to save contact message"
            );
        }


        System.out.println(
                "Contact message saved successfully."
        );


        // ==========================================
        // CREATE NOTIFICATION
        // ==========================================

        String notificationMessage =
                "New message from " +
                        (contact.getName() != null &&
                                !contact.getName().trim().isEmpty()
                                ? contact.getName()
                                : "NGO");


        try {

            int notificationResult =
                    notificationRepository.createNotification(
                            contact.getSenderId(),
                            contact.getReceiverId(),
                            null,
                            notificationMessage
                    );


            System.out.println(
                    "Notification INSERT result: "
                            + notificationResult
            );


            if (notificationResult <= 0) {

                System.err.println(
                        "WARNING: Notification was NOT inserted."
                );

            } else {

                System.out.println(
                        "Notification created successfully."
                );
            }


        } catch (Exception e) {

            System.err.println(
                    "================================="
            );

            System.err.println(
                    "NOTIFICATION INSERT FAILED"
            );

            e.printStackTrace();

            System.err.println(
                    "================================="
            );


            return ResponseEntity.internalServerError().body(
                    "Message saved, but notification creation failed: "
                            + e.getMessage()
            );
        }


        // ==========================================
        // SUCCESS
        // ==========================================

        return ResponseEntity.ok(
                "Message sent and notification created successfully"
        );
    }


    // ==========================================
    // ADMIN - GET ALL MESSAGES
    // ==========================================

    @GetMapping("/admin")
    public ResponseEntity<?> getAllMessages() {

        return ResponseEntity.ok(
                contactRepository.getAllContacts()
        );
    }


    // ==========================================
    // DONOR - GET MESSAGES
    // ==========================================

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Contact>> getMessagesForDonor(
            @PathVariable int donorId) {

        List<Contact> messages =
                contactRepository.getMessagesForDonor(donorId);

        return ResponseEntity.ok(messages);
    }
}