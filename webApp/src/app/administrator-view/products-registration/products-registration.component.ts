import { Component, OnInit } from '@angular/core';

//import globals vars
import * as globalsVars from '../../../../globals';

@Component({
  selector: 'app-products-registration',
  templateUrl: './products-registration.component.html',
  styleUrls: ['./products-registration.component.css']
})
export class ProductsRegistrationComponent implements OnInit {


  private saleModes:any;
  private currentItem:String;
  private selectedType: any;
  private productTypes:any;

  constructor() { 
    this.saleModes=globalsVars.saleModes;
    this.currentItem=this.saleModes[0];
    this.getProductTypes();
  }


  public registerProduct(){
    alert ("tipo seleccionado: " + this.selectedType.type+ " id: "+ this.selectedType.id);
    alert("tipo de venta: "+ this.currentItem);
  }


  //http request to get product types
  public getProductTypes(){
       this.productTypes = [{ id: 1, type: 'Frutas'},
                     { id: 2, type: 'Vegetales'}];
       this.selectedType=this.productTypes[0];
  }

  ngOnInit() {
  }

}
