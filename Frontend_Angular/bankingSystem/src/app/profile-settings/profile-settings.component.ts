import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  userId: String="";
  user:any={}; 
  constructor(private loginService: LoginService,private router:Router) { }
  ngOnInit(): void {
      this.userId=localStorage.getItem("userId")||""; 
      this.loginService.getUser(this.userId).subscribe((res: any[]) => {
        this.user = res;
 
      });   
  }
onSubmit()
{
  this.loginService.updateUserProfile(this.userId,this.user).subscribe((res: any[]) => {
    alert("Profile Settings Updated")
  });
}
}

