import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';


import { AppComponent } from './app.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { Routes, RouterModule } from '@angular/router';

//import globals vars
import * as globalsVars from '../../globals';

//here is necesary to set all module routes
const routes: Routes = [
  { path: '',loadChildren: './login/login.module#LoginModule'},
  { path: 'enterpriseView',loadChildren: './administrator-view/administrator-view.module#AdministratorViewModule'}
];
const routerModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    routerModule,
    AgmCoreModule.forRoot({
      apiKey:  globalsVars.api_key
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class  AppModule { }
