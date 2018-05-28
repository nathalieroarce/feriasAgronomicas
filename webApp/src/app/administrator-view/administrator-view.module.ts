import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRegistrationComponent } from './products-registration/products-registration.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainViewComponent } from './main-view/main-view.component';
import { ProductsManagementService } from '../services/administrador-view/products-management.service';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { EnterpriseProfileComponent } from './enterprise-profile/enterprise-profile.component';
import { OrdersService } from '../services/administrador-view/orders.service';

const routes: Routes = [
  { path: 'main', component: MainViewComponent, children: [
    {path: '', component: EnterpriseProfileComponent, outlet:'administrator'},
    {path: 'registerProduct', component: ProductsRegistrationComponent, outlet:'administrator'},
    {path: 'orders', component: OrdersViewComponent, outlet:'administrator'},
    {path: 'enterpriseInformation', component: EnterpriseProfileComponent, outlet:'administrator'}
    ]}
 // { path: 'registerProduct', component: ProductsRegistrationComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductsRegistrationComponent, MainViewComponent, OrdersViewComponent, EnterpriseProfileComponent],
  providers: [ProductsManagementService, OrdersService]
})
export class AdministratorViewModule { }
