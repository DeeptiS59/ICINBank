import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent {
  user:any={};
  constructor(private loginService: LoginService, private router: Router) { }
  onSubmit() {
    this.loginService.changePassword(this.user).subscribe({
      error:(res:any) => {
        alert("Wrong Password")
      },
      next:(res: any[]) => {
      alert("You password has changed!")
      this.router.navigate(["/login"])
   }});
  }
}
