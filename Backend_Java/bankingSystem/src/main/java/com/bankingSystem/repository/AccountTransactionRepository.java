package com.bankingSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingSystem.model.AccountTransaction;

public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, Integer> {
	List<AccountTransaction> findAllBySourceAccount_IdOrDestinationAccount_Id(int sid, int did);
}
