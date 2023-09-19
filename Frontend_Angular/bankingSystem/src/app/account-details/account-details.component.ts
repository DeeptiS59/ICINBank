import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReqChequeBookService } from '../req-cheque-book.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  account: any={};
  accountId: string="";
  accountTransactions:any[]=[];
  chequeBookReq:any={};
  constructor(private route: ActivatedRoute,private accountService: AccountService,private router:Router, private chequeBookreqService: ReqChequeBookService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.accountId = params.get('id')||""
      this.accountService.getAccountById(this.accountId).subscribe((res: any) => {
        this.account = res;
      });
      this.accountService.getTransactionsByAccountId(this.accountId).subscribe((res: any) => {
        this.accountTransactions = res;
      });
      this.chequeBookreqService.getChequeBookReqAccountById(this.accountId).subscribe((res: any) => {
        this.chequeBookReq = res;
      });
    })   
  }
  raiseReq() {
    this.chequeBookReq={status:"pending"};
    this.chequeBookreqService.createChequeBookReqAccountById(this.accountId,this.chequeBookReq).subscribe((res: any) => {
      alert("Cheque Book Request Raised")
    });
  }
}
