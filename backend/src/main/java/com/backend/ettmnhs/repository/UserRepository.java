package com.backend.ettmnhs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.ettmnhs.user.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findByUsername(String username);
}
