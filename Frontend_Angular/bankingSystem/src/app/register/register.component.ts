import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any={};
  constructor(private loginService: LoginService, private router: Router) { }
  onSubmit() {
    
    this.loginService.registerUser(this.user).subscribe({
      error:(res:any) => {
        alert("Could not create user. Duplicate Username")
      },
      next:(res: any[]) => {
      alert("New User Created!")
      
   }});
  }
  
}