import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseRegistrationComponent } from './enterprise-registration/enterprise-registration.component';
import { AgmCoreModule } from '@agm/core';
//import globals vars
import * as globalsVars from '../../globals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterpriseRegistrationService } from '../services/login/enterprise-registration.service';
import { LoginMainViewComponent } from './login-main-view/login-main-view.component';


const routes: Routes = [
  { path: 'login', component: LoginMainViewComponent, children: [
    { path: '', component: LoginViewComponent , outlet:'login'},
    { path: 'registerEnterprise', component: EnterpriseRegistrationComponent, outlet:'login'}
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey:  globalsVars.api_key
    })
  ],
  declarations: [LoginViewComponent, EnterpriseRegistrationComponent, LoginMainViewComponent],
  providers: [EnterpriseRegistrationService]
})
export class LoginModule { }
