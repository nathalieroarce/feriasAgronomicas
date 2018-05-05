import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRegistrationComponent } from './products-registration/products-registration.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'registerProduct', component: ProductsRegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductsRegistrationComponent]
})
export class AdministratorViewModule { }
