package com.foodwaste.controller;

import com.foodwaste.model.Message;
import com.foodwaste.repository.MessageRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://foodwaste-frontend-68uh.onrender.com"
})
public class MessageController {

    private final MessageRepository messageRepository;


    public MessageController(
            MessageRepository messageRepository) {

        this.messageRepository =
                messageRepository;
    }


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    @PostMapping
    public ResponseEntity<String> sendMessage(
            @RequestBody Message message) {

        if (message.getSenderId() <= 0 ||
                message.getReceiverId() <= 0) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid sender or receiver");
        }


        if (message.getMessage() == null ||
                message.getMessage().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Message cannot be empty");
        }


        if (message.getMessageType() == null ||
                message.getMessageType().trim().isEmpty()) {

            message.setMessageType(
                    "CONTACT_DONOR"
            );
        }


        int result =
                messageRepository.sendMessage(
                        message
                );


        if (result > 0) {

            return ResponseEntity.ok(
                    "Message sent successfully"
            );
        }


        return ResponseEntity
                .badRequest()
                .body("Failed to send message");
    }


    // ==========================================
    // GET USER MESSAGES
    // ==========================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>>
    getUserMessages(
            @PathVariable int userId) {

        return ResponseEntity.ok(
                messageRepository
                        .getMessagesForUser(userId)
        );
    }


    // ==========================================
    // UNREAD COUNT
    // ==========================================

    @GetMapping("/unread/{userId}")
    public ResponseEntity<Integer>
    getUnreadCount(
            @PathVariable int userId) {

        return ResponseEntity.ok(
                messageRepository
                        .getUnreadCount(userId)
        );
    }


    // ==========================================
    // MARK AS READ
    // ==========================================

    @PutMapping("/{messageId}/read/{userId}")
    public ResponseEntity<String>
    markAsRead(
            @PathVariable int messageId,
            @PathVariable int userId) {

        int result =
                messageRepository.markAsRead(
                        messageId,
                        userId
                );


        if (result > 0) {

            return ResponseEntity.ok(
                    "Message marked as read"
            );
        }


        return ResponseEntity
                .badRequest()
                .body("Unable to mark message as read");
    }


    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    @PutMapping("/read-all/{userId}")
    public ResponseEntity<String>
    markAllAsRead(
            @PathVariable int userId) {

        messageRepository.markAllAsRead(
                userId
        );

        return ResponseEntity.ok(
                "All messages marked as read"
        );
    }


    // ==========================================
    // ADMIN - ALL MESSAGES
    // ==========================================

    @GetMapping("/admin")
    public ResponseEntity<List<Message>>
    getAllMessages() {

        return ResponseEntity.ok(
                messageRepository
                        .getAllMessages()
        );
    }
}