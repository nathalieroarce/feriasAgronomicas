import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../services/administrador-view/orders.service';
import { userNotifications } from '../../models/userNotifications';
declare var swal:any;


@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {

   /**
   * typeOfAction, false= cancel order ; true= send order
   */

  typeOfAction: Boolean;
  loadingOrders:Boolean;
  filters: Array<any>;
  currentItem: String;
  enterpriseID: Number;
  clientDeliveryDate: Date;
  justification:String;
  orderID: Number;
  userNotify: userNotifications;
  productsOrder:any;
  isProductsView: Boolean;

  constructor(public orders : OrdersService) {
    this.productsOrder=[];
    this.isProductsView=true;
    this.userNotify= new userNotifications(); 
    this.filters= [{"text":"Pedidos no atendidos","request":"getPendingOrders" },{"text":"Pedidos enviados","request":"getSentOrders"},{"text":"Pedidos pagados","request": "getPaidOrders"}]
    this.currentItem= this.filters[0].request;
    this.enterpriseID= JSON.parse(localStorage.getItem("enterpriseID")).ID;

    this.loadOrders();
  }

  public loadOrders(){
    this.orders.getOrders(this.currentItem,this.enterpriseID).then();
  }

  public showProducts( order : any){
    this.isProductsView=true;
    this.orders.getProductOrders(order.orderID).then(response =>{
      this.productsOrder = response;
    });
  }

  public setAction(orderId:Number,action:Boolean){
    this.isProductsView=false;
    this.orderID=orderId;
    this.typeOfAction= action;
  }

  public markAsPaid(orderID: Number){
    this.isProductsView=false;
    this.orders.markAsPaid(orderID);

  }

  public sendOrder(){

    if (this.clientDeliveryDate ===undefined){
      this.userNotify.notify(1,"No se ha especificado la fecha en la que el pedido será entregado",
      "Notificación del sistema");
    }
    else{

      this.orders.sendOrder(this.orderID,this.clientDeliveryDate).then (response => {

        if (response===false){
          this.userNotify.notify(1,"No ha sido posible marcar el pedido como enviado", "Notificación del sistema");
        }
        else{
          this.orders.deleteFromOrder(this.orderID);
        }
      });
    }
  }

  public cancelEnterpriseOrder(){

    if (this.justification ===undefined || this.justification.length===0){
      this.userNotify.notify(1,"No se ha especificado la razón por la cuál se rechazará el pedido",
      "Notificación del sistema");
    }
    else{
      this.orders.cancelOrder(this.orderID,this.justification).then(response =>{
        if (response===false){
          this.userNotify.notify(1,"El rechazo del pedido no ha sido posible", "Notificación del sistema");
        }
        else{
          this.orders.deleteFromOrder(this.orderID);
        }
      });
    }
  }




  ngOnInit() {
  }

}
