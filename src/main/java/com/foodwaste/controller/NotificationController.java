package com.foodwaste.controller;

import com.foodwaste.model.Notification;
import com.foodwaste.repository.NotificationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;


    public NotificationController(
            NotificationRepository notificationRepository) {

        this.notificationRepository =
                notificationRepository;
    }


    // ==========================================
    // GET USER NOTIFICATIONS
    // ==========================================

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable int userId) {

        return notificationRepository
                .getNotifications(userId);
    }


    // ==========================================
    // GET UNREAD COUNT
    // ==========================================

    @GetMapping("/{userId}/unread-count")
    public int getUnreadCount(
            @PathVariable int userId) {

        return notificationRepository
                .getUnreadCount(userId);
    }


    // ==========================================
    // SEND NOTIFICATION
    // ==========================================

    @PostMapping
    public String sendNotification(
            @RequestParam int senderId,
            @RequestParam int receiverId,
            @RequestParam(required = false) Integer donationId,
            @RequestParam String message) {

        if (message == null ||
                message.trim().isEmpty()) {

            return "Message cannot be empty";
        }

        int result =
                notificationRepository.createNotification(
                        senderId,
                        receiverId,
                        donationId,
                        message
                );

        if (result > 0) {

            return "Message sent successfully";
        }

        return "Failed to send message";
    }


    // ==========================================
    // MARK ONE AS READ
    // ==========================================

    @PutMapping("/{notificationId}/read")
    public String markAsRead(
            @PathVariable int notificationId,
            @RequestParam int userId) {

        int result =
                notificationRepository.markAsRead(
                        notificationId,
                        userId
                );

        if (result > 0) {

            return "Notification marked as read";
        }

        return "Notification not found";
    }


    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    @PutMapping("/read-all")
    public String markAllAsRead(
            @RequestParam int userId) {

        notificationRepository.markAllAsRead(
                userId
        );

        return "All notifications marked as read";
    }
}