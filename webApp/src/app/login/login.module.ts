import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseRegistrationComponent } from './enterprise-registration/enterprise-registration.component';
import { AgmCoreModule } from '@agm/core';
//import globals vars
import * as globalsVars from '../../../globals';


const routes: Routes = [
  { path: '', component: LoginViewComponent},
  { path: 'registerEnterprise', component: EnterpriseRegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey:  globalsVars.api_key
    })
  ],
  declarations: [LoginViewComponent, EnterpriseRegistrationComponent]
})
export class LoginModule { }
