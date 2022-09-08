import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLoginComponent } from './base-login/base-login.component';
import { BaseLogoutComponent } from './base-logout/base-logout.component';
import { EmployeemoduleComponent } from './employeemodule/employeemodule.component';
import { HRModuleComponent } from './hrmodule/hrmodule.component';
import { LoginCreationComponent } from './login-creation/login-creation.component';
import { OwnReimbursementComponent } from './own-reimbursement/own-reimbursement.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLoginComponent,
  },
  {
    path: 'app-baselogincomponent',
    component: BaseLoginComponent,
  },
  {
    path: 'app-hrmodulecomponent',
    component: HRModuleComponent,
  },
  {
    path: 'app-login-creation',
    component: LoginCreationComponent,
  },
  {
    path: 'app-base-logout',
    component: BaseLogoutComponent,
  },
  {
    path: 'app-own-reimbursement',
    component: OwnReimbursementComponent,
  },
  {
    path: 'app-employeemodule',
    component: EmployeemoduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
