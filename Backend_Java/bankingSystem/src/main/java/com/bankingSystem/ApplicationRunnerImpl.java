package com.bankingSystem;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.bankingSystem.model.User;
import com.bankingSystem.repository.UserRepository;



@Component
public class ApplicationRunnerImpl implements ApplicationRunner{
	@Autowired
    UserRepository userRepository;
    
	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		Optional<User> u= userRepository.findByUsername("admin");
		if(u.isEmpty()) {
			User user= new User();
			user.setUsername("admin");
			user.setPassword("1234");
			user.setRole("admin");
			userRepository.save(user);
		}
		
	}

}
