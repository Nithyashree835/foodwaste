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
                (name, email, password, role)
                VALUES (?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
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
                SELECT id, name, email, role
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

                    user.setPassword(null);

                    user.setRole(
                            rs.getString("role")
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