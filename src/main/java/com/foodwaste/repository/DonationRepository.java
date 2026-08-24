package com.foodwaste.repository;

import com.foodwaste.model.Donation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DonationRepository {

    private final JdbcTemplate jdbcTemplate;

    public DonationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // ==========================================
    // GET ALL DONATIONS
    // ==========================================

    public List<Donation> getAllDonations() {

        String sql = """
                SELECT * FROM donations
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapDonation(rs)
        );
    }


    // ==========================================
    // ADD DONATION
    // ==========================================

    public int addDonation(Donation donation) {

        String sql = """
                INSERT INTO donations
                (
                    donor_name,
                    food_name,
                    category,
                    quantity,
                    unit,
                    prepared_date,
                    expiry_date,
                    pickup_location,
                    description,
                    status,
                    donor_id,
                    pickup_status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                donation.getDonorName(),
                donation.getFoodName(),
                donation.getCategory(),
                donation.getQuantity(),
                donation.getUnit(),
                donation.getPreparedDate(),
                donation.getExpiryDate(),
                donation.getPickupLocation(),
                donation.getDescription(),
                "AVAILABLE",
                donation.getDonorId(),
                "NOT_STARTED"
        );
    }


    // ==========================================
    // MY DONATIONS
    // ==========================================

    public List<Donation> getDonationsByDonor(int donorId) {

        String sql = """
                SELECT * FROM donations
                WHERE donor_id = ?
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapDonation(rs),
                donorId
        );
    }


    // ==========================================
    // MY CLAIMS
    // ==========================================

    public List<Donation> getClaimsByUser(int userId) {

        String sql = """
                SELECT * FROM donations
                WHERE claimed_by = ?
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapDonation(rs),
                userId
        );
    }


    // ==========================================
    // CLAIM DONATION
    // ==========================================

    public int claimDonation(
            int donationId,
            int userId) {

        String sql = """
                UPDATE donations
                SET status = 'CLAIMED',
                    claimed_by = ?,
                    pickup_status = 'PICKUP_PENDING'
                WHERE id = ?
                AND status = 'AVAILABLE'
                AND donor_id <> ?
                """;

        return jdbcTemplate.update(
                sql,
                userId,
                donationId,
                userId
        );
    }


    // ==========================================
    // UPDATE DONATION STATUS
    // ==========================================

    public int updateStatus(
            int id,
            String status,
            Integer claimedBy) {

        String sql = """
                UPDATE donations
                SET status = ?,
                    claimed_by = ?
                WHERE id = ?
                """;

        return jdbcTemplate.update(
                sql,
                status,
                claimedBy,
                id
        );
    }


    // ==========================================
    // UPDATE PICKUP STATUS
    // ==========================================

    public int updatePickupStatus(
            int donationId,
            int userId,
            String newStatus) {

        // Get current pickup status
        String selectSql = """
                SELECT pickup_status
                FROM donations
                WHERE id = ?
                AND claimed_by = ?
                """;

        List<String> currentStatuses =
                jdbcTemplate.query(
                        selectSql,
                        (rs, rowNum) ->
                                rs.getString("pickup_status"),
                        donationId,
                        userId
                );

        // Donation doesn't exist or user is not claimant
        if (currentStatuses.isEmpty()) {
            return 0;
        }

        String currentStatus =
                currentStatuses.get(0);


        // ======================================
        // CHECK VALID STATUS
        // ======================================

        if (!isValidPickupStatus(newStatus)) {
            return 0;
        }


        // ======================================
        // CHECK STATUS TRANSITION
        // ======================================

        if (!isValidStatusTransition(
                currentStatus,
                newStatus)) {

            return 0;
        }


        // ======================================
        // UPDATE STATUS
        // ======================================

        String updateSql = """
                UPDATE donations
                SET pickup_status = ?
                WHERE id = ?
                AND claimed_by = ?
                """;

        return jdbcTemplate.update(
                updateSql,
                newStatus,
                donationId,
                userId
        );
    }


    // ==========================================
    // VALID PICKUP STATUS
    // ==========================================

    private boolean isValidPickupStatus(
            String status) {

        if (status == null) {
            return false;
        }

        return status.equals("NOT_STARTED")
                || status.equals("PICKUP_PENDING")
                || status.equals("PICKUP_STARTED")
                || status.equals("PICKED_UP")
                || status.equals("COMPLETED");
    }


    // ==========================================
    // VALID STATUS TRANSITION
    // ==========================================

    private boolean isValidStatusTransition(
            String current,
            String next) {

        if (current == null || next == null) {
            return false;
        }


        return switch (current) {

            // When donation is first claimed
            case "NOT_STARTED" ->
                    next.equals("PICKUP_PENDING");


            // NGO can directly mark food as picked up
            case "PICKUP_PENDING" ->
                    next.equals("PICKED_UP");


            // Optional intermediate state
            case "PICKUP_STARTED" ->
                    next.equals("PICKED_UP");


            // After pickup, NGO can complete it
            case "PICKED_UP" ->
                    next.equals("COMPLETED");


            // Completed cannot be changed
            case "COMPLETED" ->
                    false;


            default ->
                    false;
        };
    }


    // ==========================================
    // DELETE DONATION
    // ==========================================

    public int deleteDonation(int id) {

        String sql = """
                DELETE FROM donations
                WHERE id = ?
                """;

        return jdbcTemplate.update(
                sql,
                id
        );
    }


    // ==========================================
    // MAP DATABASE → DONATION
    // ==========================================

    private Donation mapDonation(
            ResultSet rs) throws SQLException {

        Donation donation =
                new Donation();


        donation.setId(
                rs.getInt("id")
        );


        donation.setDonorName(
                rs.getString("donor_name")
        );


        donation.setFoodName(
                rs.getString("food_name")
        );


        donation.setCategory(
                rs.getString("category")
        );


        donation.setQuantity(
                rs.getInt("quantity")
        );


        donation.setUnit(
                rs.getString("unit")
        );


        donation.setPreparedDate(
                rs.getString("prepared_date")
        );


        donation.setExpiryDate(
                rs.getString("expiry_date")
        );


        donation.setPickupLocation(
                rs.getString("pickup_location")
        );


        donation.setDescription(
                rs.getString("description")
        );


        donation.setStatus(
                rs.getString("status")
        );


        // ======================================
        // DONOR ID
        // ======================================

        int donorId =
                rs.getInt("donor_id");

        if (!rs.wasNull()) {

            donation.setDonorId(
                    donorId
            );

        }


        // ======================================
        // CLAIMED BY
        // ======================================

        int claimedBy =
                rs.getInt("claimed_by");

        if (!rs.wasNull()) {

            donation.setClaimedBy(
                    claimedBy
            );

        }


        // ======================================
        // PICKUP STATUS
        // ======================================

        donation.setPickupStatus(
                rs.getString("pickup_status")
        );


        return donation;
    }
}