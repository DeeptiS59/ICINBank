package com.bankingSystem.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingSystem.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String name);
}
