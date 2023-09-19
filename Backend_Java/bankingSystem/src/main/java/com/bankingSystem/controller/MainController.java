package com.bankingSystem.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bankingSystem.model.ResetPwd;
import com.bankingSystem.model.User;
import com.bankingSystem.model.AccountTransaction;
import com.bankingSystem.model.ChequeBookRequest;
import com.bankingSystem.model.Account;
import com.bankingSystem.repository.AccountRepository;
import com.bankingSystem.repository.AccountTransactionRepository;
import com.bankingSystem.repository.ChequeBookRequestRepository;
import com.bankingSystem.repository.UserRepository;


@RestController
public class MainController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	AccountRepository accountRepository;
	@Autowired
	AccountTransactionRepository accountTransactionRepository;
	@Autowired
	ChequeBookRequestRepository chequeBookRequestRepository;

	@GetMapping("/hello")
	public String sayHello() {
		return "hello";
	}

	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:4200")
	public User loginUser(@RequestBody User user) {
		Optional<User> u = userRepository.findByUsername(user.getUsername());
		if (u.isPresent()) {
			boolean isCorrect = u.get().getPassword().equals(user.getPassword());
			if (isCorrect) {
				return u.get();
			}
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/resetpwd")
	@CrossOrigin(origins = "http://localhost:4200")
	public void changePassword(@RequestBody ResetPwd resetPwd) {
		Optional<User> u = userRepository.findByUsername("admin");
		if (u.isPresent()) {
			if (u.get().getPassword().equals(resetPwd.getOldPassword())) {
				u.get().setPassword(resetPwd.getNewPassword());
				userRepository.save(u.get());
				return;
			}
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/users")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<User> createUser(@RequestBody User user) {
		User u = new User();
		u.setUsername(user.getUsername());
		u.setPassword(user.getPassword());
		u.setRole("user");
		userRepository.save(u);
		Account a = new Account();
		a.setType("primary");
		a.setAmount(0);
		a.setUser(u);
		accountRepository.save(a);
		Account acc = new Account();
		acc.setType("saving");
		acc.setAmount(0);
		acc.setUser(u);
		accountRepository.save(acc);
		return null;
	}
	@PatchMapping("/users/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public void updateUserProfile(@PathVariable int id,@RequestBody User user) {
		Optional<User> u=userRepository.findById(id);
		if(u.isPresent()) {
			u.get().setFname(user.getFname());
			u.get().setLname(user.getLname());
			u.get().setAddress(user.getAddress());
			u.get().setPincode(user.getPincode());
			u.get().setDob(user.getDob());
			u.get().setMobileNo(user.getMobileNo());
			userRepository.save(u.get());
		}
	}
	@GetMapping("/users/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public  Optional<User> getUser(@PathVariable int id)
	{
		return	userRepository.findById(id);
	}
	@GetMapping("/users")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/users/{id}/accounts")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Account> getAccountsByUserId(@PathVariable int id) {
		return accountRepository.findAllByUser_Id(id);
	}

	@PostMapping("/transaction")
	@CrossOrigin(origins = "http://localhost:4200")
	public void transferMoney( @RequestBody AccountTransaction transaction) {

		if(transaction.getTransactionAmount()<=0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		if(transaction.getSourceAccount()!=null) {
			Optional<Account> sa=accountRepository.findById(transaction.getSourceAccount().getId());
			if(sa.isEmpty()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			}
			if(sa.get().getIsLocked()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			}
			if(sa.get().getAmount()<transaction.getTransactionAmount()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			}
		}
		if(transaction.getDestinationAccount()!=null) {
			Optional<Account> da=accountRepository.findById(transaction.getDestinationAccount().getId());
			if(da.isEmpty()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			}
			if(da.get().getIsLocked()) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			}
		}
		if(transaction.getSourceAccount()==null && transaction.getDestinationAccount()==null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		AccountTransaction at = new AccountTransaction();
		at.setTransactionAmount(transaction.getTransactionAmount());
		at.setUserComment(transaction.getUserComment());
		at.setTransactionTime(LocalDateTime.now());
		if(transaction.getSourceAccount()!=null) {
			Optional<Account> sa=accountRepository.findById(transaction.getSourceAccount().getId());
			double currentAmount=sa.get().getAmount();
			sa.get().setAmount(currentAmount-transaction.getTransactionAmount());
			accountRepository.save(sa.get());
			at.setSourceAccount(sa.get());
		}
		if(transaction.getDestinationAccount()!=null) {
			Optional<Account> da=accountRepository.findById(transaction.getDestinationAccount().getId());
			double currentAmount=da.get().getAmount();
			da.get().setAmount(currentAmount+transaction.getTransactionAmount());
			accountRepository.save(da.get());
			at.setDestinationAccount(da.get());
		}
		accountTransactionRepository.save(at);
	}
	@GetMapping("/account/{id}/transactions") 
	@CrossOrigin(origins = "http://localhost:4200")
	public List<AccountTransaction> getTransactionsByAccountId(@PathVariable int id) {
		return accountTransactionRepository.findAllBySourceAccount_IdOrDestinationAccount_Id(id, id);
	}
	@GetMapping("/account/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public Optional<Account> getAccountById(@PathVariable int id) {
		return accountRepository.findById(id);
	}
	@PatchMapping("/account/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public void editAccountById(@PathVariable int id, @RequestBody Account acc) {
		Optional<Account> c=	accountRepository.findById(id);
		if(c.isPresent()) {
			c.get().setIsLocked(acc.getIsLocked());
			accountRepository.save(c.get());
		}
	}
	
	@GetMapping("/account/{id}/chequeBookReq")
	@CrossOrigin(origins = "http://localhost:4200")
	public Optional<ChequeBookRequest> getChequeBookReqAccountById(@PathVariable int id) {
		return chequeBookRequestRepository.findByAccount_Id(id);
	}
	@PostMapping("/account/{id}/chequeBookReq")
	@CrossOrigin(origins = "http://localhost:4200")
	public void createChequeBookReqAccountById(@PathVariable int id, @RequestBody ChequeBookRequest cbr ) {
		ChequeBookRequest req= new ChequeBookRequest();
		req.setStatus(cbr.getStatus());
		Account a= new Account();
		a.setId(id);
		req.setAccount(a);
		chequeBookRequestRepository.save(req);	
	}
	@PatchMapping("/chequeBookReq/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public void updateChequeBookReqAccountById(@PathVariable int id, @RequestBody ChequeBookRequest cbr) {
		Optional<ChequeBookRequest> c=	chequeBookRequestRepository.findById(id);
		if(c.isPresent()) {
			c.get().setStatus(cbr.getStatus());
			chequeBookRequestRepository.save(c.get());
		}
	}
	@GetMapping("/chequeBookReq")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<ChequeBookRequest> getChequeBookReq() {
		return chequeBookRequestRepository.findAll();
	}
}
