import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
 
  constructor(private accountService: AccountService, private router: Router) { }
  accountList: any[] = [];

  userId:string="";
  ngOnInit() {
    this.userId=localStorage.getItem("userId")||"";
    this.accountService.getAccountsByUserId(this.userId).subscribe((res: any[]) => {
      this.accountList = res;
    });   
  }

}
