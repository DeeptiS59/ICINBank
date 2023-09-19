package com.bankingSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingSystem.model.ChequeBookRequest;



public interface ChequeBookRequestRepository extends JpaRepository<ChequeBookRequest, Integer> {
    Optional<ChequeBookRequest> findByAccount_Id(int id);
}