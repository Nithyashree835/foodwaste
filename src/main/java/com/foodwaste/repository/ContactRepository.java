package com.foodwaste.repository;

import com.foodwaste.model.Contact;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactRepository {

    private final JdbcTemplate jdbcTemplate;

    public ContactRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // ==========================================
    // SAVE CONTACT / FEEDBACK / DONOR MESSAGE
    // ==========================================

    public int saveContact(Contact contact) {

        String sql = """
                INSERT INTO contacts
                (
                    name,
                    email,
                    subject,
                    message,
                    sender_role,
                    receiver_id,
                    donor_id,
                    type
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                contact.getName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getSenderRole(),
                contact.getReceiverId(),
                contact.getDonorId(),
                contact.getType()
        );
    }


    // ==========================================
    // ADMIN - GET ALL MESSAGES
    // ==========================================

    public List<Contact> getAllContacts() {

        String sql = """
                SELECT
                    id,
                    name,
                    email,
                    subject,
                    message,
                    created_at,
                    sender_role,
                    receiver_id,
                    donor_id,
                    type
                FROM contacts
                ORDER BY created_at DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Contact contact = new Contact();

                    contact.setId(rs.getInt("id"));
                    contact.setName(rs.getString("name"));
                    contact.setEmail(rs.getString("email"));
                    contact.setSubject(rs.getString("subject"));
                    contact.setMessage(rs.getString("message"));
                    contact.setCreatedAt(rs.getString("created_at"));
                    contact.setSenderRole(rs.getString("sender_role"));
                    contact.setReceiverId(rs.getInt("receiver_id"));
                    contact.setDonorId(rs.getInt("donor_id"));
                    contact.setType(rs.getString("type"));

                    return contact;
                }
        );
    }


    // ==========================================
    // DONOR - GET MESSAGES SENT TO DONOR
    // ==========================================

    public List<Contact> getMessagesForDonor(int donorId) {

        String sql = """
                SELECT
                    id,
                    name,
                    email,
                    subject,
                    message,
                    created_at,
                    sender_role,
                    receiver_id,
                    donor_id,
                    type
                FROM contacts
                WHERE donor_id = ?
                ORDER BY created_at DESC
                """;

        return jdbcTemplate.query(
                sql,
                new Object[]{donorId},
                (rs, rowNum) -> {

                    Contact contact = new Contact();

                    contact.setId(rs.getInt("id"));
                    contact.setName(rs.getString("name"));
                    contact.setEmail(rs.getString("email"));
                    contact.setSubject(rs.getString("subject"));
                    contact.setMessage(rs.getString("message"));
                    contact.setCreatedAt(rs.getString("created_at"));
                    contact.setSenderRole(rs.getString("sender_role"));
                    contact.setReceiverId(rs.getInt("receiver_id"));
                    contact.setDonorId(rs.getInt("donor_id"));
                    contact.setType(rs.getString("type"));

                    return contact;
                }
        );
    }
}