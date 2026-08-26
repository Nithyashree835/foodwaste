package com.foodwaste.repository;

import com.foodwaste.model.Message;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MessageRepository {

    private final JdbcTemplate jdbcTemplate;


    public MessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    public int sendMessage(Message message) {

        String sql = """
                INSERT INTO messages
                (
                    sender_id,
                    receiver_id,
                    subject,
                    message,
                    message_type,
                    is_read
                )
                VALUES (?, ?, ?, ?, ?, FALSE)
                """;

        return jdbcTemplate.update(
                sql,
                message.getSenderId(),
                message.getReceiverId(),
                message.getSubject(),
                message.getMessage(),
                message.getMessageType()
        );
    }


    // ==========================================
    // GET MESSAGES FOR USER
    // ==========================================

    public List<Message> getMessagesForUser(int userId) {

        String sql = """
                SELECT
                    m.id,
                    m.sender_id,
                    m.receiver_id,
                    m.subject,
                    m.message,
                    m.message_type,
                    m.is_read,
                    m.created_at,

                    sender.name AS sender_name,
                    receiver.name AS receiver_name

                FROM messages m

                JOIN users sender
                    ON m.sender_id = sender.id

                JOIN users receiver
                    ON m.receiver_id = receiver.id

                WHERE m.receiver_id = ?

                ORDER BY m.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Message message =
                            new Message();

                    message.setId(
                            rs.getInt("id")
                    );

                    message.setSenderId(
                            rs.getInt("sender_id")
                    );

                    message.setReceiverId(
                            rs.getInt("receiver_id")
                    );

                    message.setSubject(
                            rs.getString("subject")
                    );

                    message.setMessage(
                            rs.getString("message")
                    );

                    message.setMessageType(
                            rs.getString("message_type")
                    );

                    message.setRead(
                            rs.getBoolean("is_read")
                    );

                    message.setCreatedAt(
                            rs.getString("created_at")
                    );

                    message.setSenderName(
                            rs.getString("sender_name")
                    );

                    message.setReceiverName(
                            rs.getString("receiver_name")
                    );

                    return message;
                },
                userId
        );
    }


    // ==========================================
    // GET UNREAD COUNT
    // ==========================================

    public int getUnreadCount(int userId) {

        String sql = """
                SELECT COUNT(*)
                FROM messages
                WHERE receiver_id = ?
                AND is_read = FALSE
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        userId
                );

        return count == null ? 0 : count;
    }


    // ==========================================
    // MARK MESSAGE AS READ
    // ==========================================

    public int markAsRead(
            int messageId,
            int userId) {

        String sql = """
                UPDATE messages
                SET is_read = TRUE
                WHERE id = ?
                AND receiver_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                messageId,
                userId
        );
    }


    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    public int markAllAsRead(int userId) {

        String sql = """
                UPDATE messages
                SET is_read = TRUE
                WHERE receiver_id = ?
                AND is_read = FALSE
                """;

        return jdbcTemplate.update(
                sql,
                userId
        );
    }


    // ==========================================
    // GET ALL MESSAGES - ADMIN
    // ==========================================

    public List<Message> getAllMessages() {

        String sql = """
                SELECT
                    m.id,
                    m.sender_id,
                    m.receiver_id,
                    m.subject,
                    m.message,
                    m.message_type,
                    m.is_read,
                    m.created_at,

                    sender.name AS sender_name,
                    receiver.name AS receiver_name

                FROM messages m

                JOIN users sender
                    ON m.sender_id = sender.id

                JOIN users receiver
                    ON m.receiver_id = receiver.id

                ORDER BY m.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Message message =
                            new Message();

                    message.setId(
                            rs.getInt("id")
                    );

                    message.setSenderId(
                            rs.getInt("sender_id")
                    );

                    message.setReceiverId(
                            rs.getInt("receiver_id")
                    );

                    message.setSubject(
                            rs.getString("subject")
                    );

                    message.setMessage(
                            rs.getString("message")
                    );

                    message.setMessageType(
                            rs.getString("message_type")
                    );

                    message.setRead(
                            rs.getBoolean("is_read")
                    );

                    message.setCreatedAt(
                            rs.getString("created_at")
                    );

                    message.setSenderName(
                            rs.getString("sender_name")
                    );

                    message.setReceiverName(
                            rs.getString("receiver_name")
                    );

                    return message;
                }
        );
    }
}