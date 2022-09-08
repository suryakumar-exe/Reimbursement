import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLoginComponent } from './base-login/base-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { HRModuleComponent } from './hrmodule/hrmodule.component';
import { LoginCreationComponent } from './login-creation/login-creation.component';
import { BaseLogoutComponent } from './base-logout/base-logout.component';
import { OwnReimbursementComponent } from './own-reimbursement/own-reimbursement.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { EmployeemoduleComponent } from './employeemodule/employeemodule.component';
import { ItmoduleComponent } from './itmodule/itmodule.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    BaseLoginComponent,
    HRModuleComponent,
    LoginCreationComponent,
    BaseLogoutComponent,
    OwnReimbursementComponent,
    EmployeemoduleComponent,
    ItmoduleComponent,
    NewpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
