import { Component } from '@angular/core';
import { ReqChequeBookService } from '../req-cheque-book.service';

@Component({
  selector: 'app-approve-req',
  templateUrl: './approve-req.component.html',
  styleUrls: ['./approve-req.component.css']
})
export class ApproveReqComponent {
  reqList: any[] = [];
  constructor(private chequeBookReq: ReqChequeBookService) { }
  ngOnInit(): void {
    this.chequeBookReq.getChequeBookReq().subscribe((res: any) => {
      this.reqList = res;
    });
  }
  approveReq(item: any) {
    item.status="approved";
    this.chequeBookReq.updateChequeBookReqAccountById(item.id, item).subscribe((res: any) => {
      var msg = "SMS sent on user's contact number that the cheque book request for account " + item.id + " is approved"
      alert(msg);
    });
  }
  declineReq(item: any) {
    item.status="declined";
    this.chequeBookReq.updateChequeBookReqAccountById(item.id, item).subscribe((res: any) => {
      var msg = "SMS sent on user's contact number that the cheque book request for account " + item.id + " is not approved"
      alert(msg);
    });
  }
}
