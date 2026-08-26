package com.foodwaste.repository;

import com.foodwaste.model.Notification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationRepository {

    private final JdbcTemplate jdbcTemplate;


    public NotificationRepository(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }


    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    public int createNotification(
            int senderId,
            int receiverId,
            Integer donationId,
            String message) {

        String sql = """
                INSERT INTO notifications
                (
                    sender_id,
                    receiver_id,
                    donation_id,
                    message,
                    type,
                    is_read,
                    created_at
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    'CONTACT',
                    FALSE,
                    NOW()
                )
                """;

        return jdbcTemplate.update(
                sql,
                senderId,
                receiverId,
                donationId,
                message
        );
    }


    // ==========================================
    // GET NOTIFICATIONS
    // ==========================================

    public List<Notification> getNotifications(
            int receiverId) {

        String sql = """
                SELECT
                    n.id,
                    n.sender_id,
                    n.receiver_id,
                    n.donation_id,
                    n.message,
                    n.type,
                    n.is_read,
                    n.created_at,

                    u.name AS sender_name

                FROM notifications n

                JOIN users u
                    ON n.sender_id = u.id

                WHERE n.receiver_id = ?

                ORDER BY n.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Notification notification =
                            new Notification();

                    notification.setId(
                            rs.getInt("id")
                    );

                    notification.setSenderId(
                            rs.getInt("sender_id")
                    );

                    notification.setReceiverId(
                            rs.getInt("receiver_id")
                    );

                    int donationId =
                            rs.getInt("donation_id");

                    if (!rs.wasNull()) {
                        notification.setDonationId(
                                donationId
                        );
                    }

                    notification.setSenderName(
                            rs.getString("sender_name")
                    );

                    notification.setMessage(
                            rs.getString("message")
                    );

                    notification.setType(
                            rs.getString("type")
                    );

                    notification.setRead(
                            rs.getBoolean("is_read")
                    );

                    notification.setCreatedAt(
                            rs.getString("created_at")
                    );

                    return notification;
                },
                receiverId
        );
    }


    // ==========================================
    // GET UNREAD COUNT
    // ==========================================

    public int getUnreadCount(
            int receiverId) {

        String sql = """
                SELECT COUNT(*)
                FROM notifications
                WHERE receiver_id = ?
                AND is_read = FALSE
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        receiverId
                );

        return count == null ? 0 : count;
    }


    // ==========================================
    // MARK ONE AS READ
    // ==========================================

    public int markAsRead(
            int notificationId,
            int receiverId) {

        String sql = """
                UPDATE notifications
                SET is_read = TRUE
                WHERE id = ?
                AND receiver_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                notificationId,
                receiverId
        );
    }


    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    public int markAllAsRead(
            int receiverId) {

        String sql = """
                UPDATE notifications
                SET is_read = TRUE
                WHERE receiver_id = ?
                AND is_read = FALSE
                """;

        return jdbcTemplate.update(
                sql,
                receiverId
        );
    }
}