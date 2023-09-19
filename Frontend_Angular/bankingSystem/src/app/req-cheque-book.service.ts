import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ReqChequeBookService {

  constructor(public HttpClient: HttpClient) { }
  public getChequeBookReqAccountById(id:any):any{
    let url = "http://localhost:8080/account/"+id+"/chequeBookReq";
    return this.HttpClient.get(url);
  }
  public createChequeBookReqAccountById(id:any,chequebookreq:any):any{
    let url = "http://localhost:8080/account/"+id+"/chequeBookReq";
    return this.HttpClient.post(url,chequebookreq);
  }
  public updateChequeBookReqAccountById(id:any,chequebookreq:any):any{
    let url = "http://localhost:8080/chequeBookReq/"+id;
    return this.HttpClient.patch(url,chequebookreq);
  }
  public getChequeBookReq() {
    let url = "http://localhost:8080/chequeBookReq";
    return this.HttpClient.get(url);
  }
}
