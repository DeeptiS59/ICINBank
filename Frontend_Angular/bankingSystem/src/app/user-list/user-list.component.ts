import { Component,OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
constructor(private loginService:LoginService) {}
userList:any[]=[];
ngOnInit(): void {
  this.loginService.getUsers().subscribe((res: any[]) => {
    this.userList = res;
  });   
}
}
