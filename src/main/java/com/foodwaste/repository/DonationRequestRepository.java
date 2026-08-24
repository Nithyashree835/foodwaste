package com.foodwaste.repository;

import com.foodwaste.model.DonationRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DonationRequestRepository {

    private final JdbcTemplate jdbcTemplate;

    public DonationRequestRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // ==========================================
    // GET REQUESTS FOR A DONOR
    // ==========================================

    public List<DonationRequest> getRequestsByDonor(int donorId) {

        String sql = """
                SELECT
                    dr.id,
                    dr.donation_id,
                    dr.ngo_id,
                    dr.requested_quantity,
                    dr.request_date,
                    dr.status,

                    d.food_name,
                    d.category,
                    d.quantity,
                    d.unit,
                    d.pickup_location,
                    d.expiry_date,

                    u.name AS ngo_name

                FROM donation_requests dr

                JOIN donations d
                    ON dr.donation_id = d.id

                JOIN users u
                    ON dr.ngo_id = u.id

                WHERE d.donor_id = ?

                ORDER BY dr.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapRequest(rs),
                donorId
        );
    }


    // ==========================================
    // GET REQUESTS FOR NGO
    // ==========================================

    public List<DonationRequest> getRequestsByNgo(int ngoId) {

        String sql = """
                SELECT
                    dr.id,
                    dr.donation_id,
                    dr.ngo_id,
                    dr.requested_quantity,
                    dr.request_date,
                    dr.status,

                    d.food_name,
                    d.category,
                    d.quantity,
                    d.unit,
                    d.pickup_location,
                    d.expiry_date,

                    u.name AS donor_name

                FROM donation_requests dr

                JOIN donations d
                    ON dr.donation_id = d.id

                JOIN users u
                    ON d.donor_id = u.id

                WHERE dr.ngo_id = ?

                ORDER BY dr.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapNgoRequest(rs),
                ngoId
        );
    }


    // ==========================================
    // CREATE REQUEST
    // ==========================================

    public String createRequest(
            int donationId,
            int ngoId,
            int requestedQuantity) {

        // Check donation exists

        String donationCheckSql = """
                SELECT COUNT(*)
                FROM donations
                WHERE id = ?
                """;

        Integer donationExists =
                jdbcTemplate.queryForObject(
                        donationCheckSql,
                        Integer.class,
                        donationId
                );

        if (donationExists == null || donationExists == 0) {

            return "Donation not found";
        }


        // Check NGO already requested this donation

        String requestCheckSql = """
                SELECT COUNT(*)
                FROM donation_requests
                WHERE donation_id = ?
                AND ngo_id = ?
                AND status = 'PENDING'
                """;

        Integer requestExists =
                jdbcTemplate.queryForObject(
                        requestCheckSql,
                        Integer.class,
                        donationId,
                        ngoId
                );

        if (requestExists != null && requestExists > 0) {

            return "You have already requested this donation";
        }


        // Check donation status

        String statusSql = """
                SELECT status
                FROM donations
                WHERE id = ?
                """;

        String donationStatus =
                jdbcTemplate.queryForObject(
                        statusSql,
                        String.class,
                        donationId
                );

        if (!"AVAILABLE".equalsIgnoreCase(donationStatus)) {

            return "This donation is no longer available";
        }


        // Validate quantity

        String quantitySql = """
                SELECT quantity
                FROM donations
                WHERE id = ?
                """;

        Integer availableQuantity =
                jdbcTemplate.queryForObject(
                        quantitySql,
                        Integer.class,
                        donationId
                );

        if (availableQuantity == null ||
                requestedQuantity <= 0 ||
                requestedQuantity > availableQuantity) {

            return "Invalid requested quantity";
        }


        // Create donation request

        String sql = """
                INSERT INTO donation_requests
                (
                    donation_id,
                    ngo_id,
                    requested_quantity,
                    request_date,
                    status
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    NOW(),
                    'PENDING'
                )
                """;

        int result =
                jdbcTemplate.update(
                        sql,
                        donationId,
                        ngoId,
                        requestedQuantity
                );

        if (result > 0) {

            return "Donation request created successfully";
        }

        return "Unable to create donation request";
    }


    // ==========================================
    // APPROVE REQUEST
    // ==========================================

    public int approveRequest(int requestId) {

        String donationSql = """
                SELECT donation_id
                FROM donation_requests
                WHERE id = ?
                AND status = 'PENDING'
                """;

        List<Integer> donationIds =
                jdbcTemplate.query(
                        donationSql,
                        (rs, rowNum) ->
                                rs.getInt("donation_id"),
                        requestId
                );

        if (donationIds.isEmpty()) {
            return 0;
        }

        int donationId =
                donationIds.get(0);


        // Approve request

        String approveSql = """
                UPDATE donation_requests
                SET status = 'APPROVED'
                WHERE id = ?
                AND status = 'PENDING'
                """;

        int result =
                jdbcTemplate.update(
                        approveSql,
                        requestId
                );

        if (result == 0) {
            return 0;
        }


        // Reject other pending requests

        String rejectOthersSql = """
                UPDATE donation_requests
                SET status = 'REJECTED'
                WHERE donation_id = ?
                AND id <> ?
                AND status = 'PENDING'
                """;

        jdbcTemplate.update(
                rejectOthersSql,
                donationId,
                requestId
        );


        // Update donation

        String updateDonationSql = """
                UPDATE donations d
                JOIN donation_requests dr
                    ON d.id = dr.donation_id
                SET d.status = 'CLAIMED',
                    d.claimed_by = dr.ngo_id,
                    d.pickup_status = 'PICKUP_PENDING'
                WHERE dr.id = ?
                """;

        jdbcTemplate.update(
                updateDonationSql,
                requestId
        );

        return 1;
    }


    // ==========================================
    // REJECT REQUEST
    // ==========================================

    public int rejectRequest(int requestId) {

        String sql = """
                UPDATE donation_requests
                SET status = 'REJECTED'
                WHERE id = ?
                AND status = 'PENDING'
                """;

        return jdbcTemplate.update(
                sql,
                requestId
        );
    }


    // ==========================================
    // MAP DONOR REQUEST
    // ==========================================

    private DonationRequest mapRequest(
            ResultSet rs) throws SQLException {

        DonationRequest request =
                new DonationRequest();

        request.setId(
                rs.getInt("id")
        );

        request.setDonationId(
                rs.getInt("donation_id")
        );

        request.setNgoId(
                rs.getInt("ngo_id")
        );

        request.setRequestedQuantity(
                rs.getInt("requested_quantity")
        );

        request.setRequestDate(
                rs.getString("request_date")
        );

        request.setStatus(
                rs.getString("status")
        );

        request.setFoodName(
                rs.getString("food_name")
        );

        request.setCategory(
                rs.getString("category")
        );

        request.setQuantity(
                rs.getInt("quantity")
        );

        request.setUnit(
                rs.getString("unit")
        );

        request.setPickupLocation(
                rs.getString("pickup_location")
        );

        request.setExpiryDate(
                rs.getString("expiry_date")
        );

        request.setNgoName(
                rs.getString("ngo_name")
        );

        return request;
    }


    // ==========================================
    // MAP NGO REQUEST
    // ==========================================

    private DonationRequest mapNgoRequest(
            ResultSet rs) throws SQLException {

        DonationRequest request =
                new DonationRequest();

        request.setId(
                rs.getInt("id")
        );

        request.setDonationId(
                rs.getInt("donation_id")
        );

        request.setNgoId(
                rs.getInt("ngo_id")
        );

        request.setRequestedQuantity(
                rs.getInt("requested_quantity")
        );

        request.setRequestDate(
                rs.getString("request_date")
        );

        request.setStatus(
                rs.getString("status")
        );

        request.setFoodName(
                rs.getString("food_name")
        );

        request.setCategory(
                rs.getString("category")
        );

        request.setQuantity(
                rs.getInt("quantity")
        );

        request.setUnit(
                rs.getString("unit")
        );

        request.setPickupLocation(
                rs.getString("pickup_location")
        );

        request.setExpiryDate(
                rs.getString("expiry_date")
        );

        request.setDonorName(
                rs.getString("donor_name")
        );

        return request;
    }
}