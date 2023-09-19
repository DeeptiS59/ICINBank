package com.bankingSystem.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingSystem.model.Account;



public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findAllByUser_Id(int id);
}
