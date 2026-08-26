package com.foodwaste.repository;

import com.foodwaste.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // ==============================
    // REGISTER USER
    // ==============================

    public int registerUser(User user) {

        String sql = """
                INSERT INTO users
                (
                    name,
                    email,
                    password,
                    role,
                    phone,
                    address,
                    organization_name,
                    organization_type
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getPhone(),
                user.getAddress(),
                user.getOrganizationName(),
                user.getOrganizationType()
        );
    }


    // ==============================
    // FIND USER BY EMAIL
    // ==============================

    public User findByEmail(String email) {

        String sql = """
                SELECT *
                FROM users
                WHERE email = ?
                """;

        return jdbcTemplate.query(
                sql,
                rs -> {

                    if (rs.next()) {

                        User user = new User();

                        user.setId(
                                rs.getInt("id")
                        );

                        user.setName(
                                rs.getString("name")
                        );

                        user.setEmail(
                                rs.getString("email")
                        );

                        user.setPassword(
                                rs.getString("password")
                        );

                        user.setRole(
                                rs.getString("role")
                        );

                        user.setPhone(
                                rs.getString("phone")
                        );

                        user.setAddress(
                                rs.getString("address")
                        );

                        user.setOrganizationName(
                                rs.getString("organization_name")
                        );

                        user.setOrganizationType(
                                rs.getString("organization_type")
                        );

                        return user;
                    }

                    return null;
                },
                email
        );
    }


    // ==============================
    // GET ALL USERS
    // ==============================

    public List<User> getAllUsers() {

        String sql = """
                SELECT
                    id,
                    name,
                    email,
                    role,
                    phone,
                    address,
                    organization_name,
                    organization_type
                FROM users
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    User user = new User();

                    user.setId(
                            rs.getInt("id")
                    );

                    user.setName(
                            rs.getString("name")
                    );

                    user.setEmail(
                            rs.getString("email")
                    );

                    // Never return password
                    user.setPassword(null);

                    user.setRole(
                            rs.getString("role")
                    );

                    user.setPhone(
                            rs.getString("phone")
                    );

                    user.setAddress(
                            rs.getString("address")
                    );

                    user.setOrganizationName(
                            rs.getString("organization_name")
                    );

                    user.setOrganizationType(
                            rs.getString("organization_type")
                    );

                    return user;
                }
        );
    }


    // ==============================
    // DELETE USER
    // ==============================

    public int deleteUser(int id) {

        String sql = """
                DELETE FROM users
                WHERE id = ?
                AND role <> 'ADMIN'
                """;

        return jdbcTemplate.update(
                sql,
                id
        );
    }
}