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

@NgModule({
  declarations: [
    AppComponent,
    BaseLoginComponent,
    HRModuleComponent,
    LoginCreationComponent,
    BaseLogoutComponent,
    OwnReimbursementComponent,
  ],
  imports: [
    BrowserModule,
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
