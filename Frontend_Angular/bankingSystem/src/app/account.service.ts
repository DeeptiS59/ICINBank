import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public HttpClient: HttpClient) { }
  public getAccountsByUserId(id:any):any{
    let url = "http://localhost:8080/users/"+id+"/accounts";
    return this.HttpClient.get(url);
  }
  public transferMoney(transaction:any):any {
    let url = "http://localhost:8080/transaction"
    return this.HttpClient.post(url,transaction);
  }
  public getTransactionsByAccountId(id:any) {
    let url = "http://localhost:8080/account/"+id+"/transactions";
    return this.HttpClient.get(url);
  }
  public getAccountById(id:any) {
    let url = "http://localhost:8080/account/"+id;
    return this.HttpClient.get(url);
  }
  public editAccountById(id:any,account:any) {
    let url = "http://localhost:8080/account/"+id;
    return this.HttpClient.patch(url,account)
  }
}
