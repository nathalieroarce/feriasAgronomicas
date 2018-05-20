import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {

  private loadingOrders:Boolean;
  private filters: Array<any>;
  private currentItem: boolean;

  constructor() { 
    this.loadingOrders=true;
    this.filters= [{"text":"Pedidos no atendidos","value": false},{"text":"Pedidos enviados","value": true}]
    this.currentItem= this.filters[0].value;
    
  
  }


  ngOnInit() {
  }

}
