import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLoginComponent } from './base-login/base-login.component';
import { HRModuleComponent } from './hrmodule/hrmodule.component';
import { LoginCreationComponent } from './login-creation/login-creation.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
