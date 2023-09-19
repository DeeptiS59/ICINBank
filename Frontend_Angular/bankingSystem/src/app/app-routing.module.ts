import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { AdminGuardService } from './admin-guard.service';
import { AccountListComponent } from './account-list/account-list.component';
import { UserGuardService } from './user-guard.service';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { UserListComponent } from './user-list/user-list.component';
import { ApproveReqComponent } from './approve-req/approve-req.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
{ path:"login", component:LoginComponent},
{ path:"logout",component:LogoutComponent},
{ path:"register", component:RegisterComponent},
{ path:"resetpwd",component:ResetPwdComponent,canActivate:[AdminGuardService]},
{ path:"admin/homepage", component:AdminHomepageComponent, canActivate:[AdminGuardService]},
{ path:"admin/userList",component:UserListComponent, canActivate:[AdminGuardService]},
{ path:"admin/getReq",component:ApproveReqComponent, canActivate:[AdminGuardService]},
{ path:"admin/user/:id",component:AdminUserDetailsComponent, canActivate:[AdminGuardService]},
{ path:"user/accountList",component:AccountListComponent, canActivate:[UserGuardService]},
{ path:"user/homepage", component:UserHomepageComponent, canActivate:[UserGuardService]},
{ path:"user/deposit", component:DepositComponent, canActivate:[UserGuardService]},
{ path:"user/withdraw", component:WithdrawComponent, canActivate:[UserGuardService]},
{ path:"user/transfer", component:TransferComponent, canActivate:[UserGuardService]},
{ path:"user/profileSettings", component:ProfileSettingsComponent, canActivate:[UserGuardService]},
{ path:"user/account/:id", component:AccountDetailsComponent, canActivate:[UserGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
