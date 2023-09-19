import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {
 
  constructor(private accountService: AccountService, private router: Router,private route: ActivatedRoute) { }
  accountList: any[] = [];

  userId:string="";
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id')||""
      this.accountService.getAccountsByUserId(this.userId).subscribe((res: any[]) => {
        this.accountList = res;
      }); 
    })   
  }
  onEnable(item: any) {
    item.isLocked=false;
    this.accountService.editAccountById(item.id, item).subscribe((res: any) => {
      var msg = " account " + item.id + " is activated"
      alert(msg);
    });
  }
  onDisable(item: any) {
    item.isLocked=true;
    this.accountService.editAccountById(item.id, item).subscribe((res: any) => {
      var msg = " account " + item.id + " is deactivated"
      alert(msg);
    });
  }
}
