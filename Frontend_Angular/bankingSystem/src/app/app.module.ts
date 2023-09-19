import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccountListComponent } from './account-list/account-list.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ApproveReqComponent } from './approve-req/approve-req.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomepageComponent,
    UserHomepageComponent,
    LoginComponent,
    RegisterComponent,
    ResetPwdComponent,
    AccountListComponent,
    ProfileSettingsComponent,
    WithdrawComponent,
    DepositComponent,
    TransferComponent,
    AccountDetailsComponent,
    ApproveReqComponent,
    UserListComponent,
    AdminUserDetailsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
