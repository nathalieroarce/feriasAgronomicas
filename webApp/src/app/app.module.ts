import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';


import { AppComponent } from './app.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';



//here is necesary to set all module routes
const routes: Routes = [
  { path: '',loadChildren: './login/login.module#LoginModule' , pathMatch: 'full'},
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
    FormsModule,
    HttpModule,
    HttpClientModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class  AppModule { }
