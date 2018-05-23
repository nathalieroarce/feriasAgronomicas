import { Component, OnInit } from '@angular/core';
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
  private typeOfAction: Boolean;
  private loadingOrders:Boolean;
  private filters: Array<any>;
  private currentItem: boolean;
  private enterpriseID: Number;
  private clientDeliveryDate: Date;
  private justification:String;
  private orderID: Number;
  private userNotify: userNotifications;

  constructor(private orders : OrdersService) {
    this.userNotify= new userNotifications(); 
    this.filters= [{"text":"Pedidos no atendidos","value": false},{"text":"Pedidos enviados","value": true}]
    this.currentItem= this.filters[0].value;
    this.enterpriseID=1;
    this.loadOrders();
    
  
  }

  public loadOrders(){
   
    if (this.currentItem== true){
      this.orders.getOrders("getSentOrders",this.enterpriseID).then();
      
    }
    else{
      this.orders.getOrders("getPendingOrders",this.enterpriseID).then();
    }
  }

  public setAction(orderId:Number,action:Boolean){
    this.orderID=orderId;
    this.typeOfAction= action;
  }

  public sendOrder(){
   
    if (this.clientDeliveryDate ===undefined){
      this.userNotify.notify(1,"No se ha especificado la fecha en la que el pedido será entregado", 
      "Notificación del sistema");
    }
    else{

      this.orders.sendOrder(this.orderID,this.clientDeliveryDate).then(response =>{
        
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
