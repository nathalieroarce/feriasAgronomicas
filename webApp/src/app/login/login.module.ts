import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseRegistrationComponent } from './enterprise-registration/enterprise-registration.component';
import { AgmCoreModule } from '@agm/core';
//import globals vars
import * as globalsVars from '../../../globals';
import { FormsModule } from '@angular/forms';
import { EnterpriseRegistrationService } from '../services/login/enterprise-registration.service';


const routes: Routes = [
  { path: '', component: LoginViewComponent},
  { path: 'registerEnterprise', component: EnterpriseRegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey:  globalsVars.api_key
    })
  ],
  declarations: [LoginViewComponent, EnterpriseRegistrationComponent],
  providers: [EnterpriseRegistrationService]
})
export class LoginModule { }
