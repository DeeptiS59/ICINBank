import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
 
  constructor(private accountService: AccountService, private router: Router) { }
  accountList: any[] = [];
  transaction: any={sourceAccount:{}};
  userId:string="";
  ngOnInit() {
    this.userId=localStorage.getItem("userId")||"";
    this.accountService.getAccountsByUserId(this.userId).subscribe((res: any[]) => {
      this.accountList = res;
    });   
  }
  onSubmit() {
    this.accountService.transferMoney(this.transaction).subscribe({
      error: (res: any[]) => {
        alert("Your account has been disabled due to security reasons.Check with the nearest branch for further information");
      },
      next: (res: any[]) => {
        alert("Money Withdrawn");
      }
    });
  }  
}
