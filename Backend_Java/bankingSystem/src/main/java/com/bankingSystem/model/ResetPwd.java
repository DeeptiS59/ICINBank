package com.bankingSystem.model;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ResetPwd {
	
	
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
	        private  int id;
			public ResetPwd() {
			super();
			// TODO Auto-generated constructor stub
		}
			public int getId() {
				return id;
			}
			public void setId(int id) {
				this.id = id;
			}
			
			
			public String getNewPassword() {
				return newPassword;
			}
			public void setNewPassword(String newPassword) {
				this.newPassword = newPassword;
			}
			public String getOldPassword() {
				return oldPassword;
			}
			public void setOldPassword(String oldPassword) {
				this.oldPassword = oldPassword;
			}


			private String newPassword;
			private String oldPassword;
	}

