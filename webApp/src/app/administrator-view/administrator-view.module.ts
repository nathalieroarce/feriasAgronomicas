import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRegistrationComponent } from './products-registration/products-registration.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainViewComponent } from './main-view/main-view.component';
import { ProductsManagementService } from '../services/administrador-view/products-management.service';

const routes: Routes = [
  { path: '', component: MainViewComponent},
  { path: 'registerProduct', component: ProductsRegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductsRegistrationComponent, MainViewComponent],
  providers: [ProductsManagementService]
})
export class AdministratorViewModule { }
