import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../services/administrador-view/products-management.service';
import { generalChecker } from '../../models/generalChecker';
import { userNotifications } from '../../models/userNotifications';

//import globals vars
import * as globalsVars from '../../../../globals';
import { FormGroup } from '@angular/forms';

declare var swal:any;

@Component({
  selector: 'app-products-registration',
  templateUrl: './products-registration.component.html',
  styleUrls: ['./products-registration.component.css']
})
export class ProductsRegistrationComponent implements OnInit {


  private registeringProduct:Boolean;
  private saleModes:any;
  private currentItem:String;
  private selectedType: any;
  private productTypes:any;
  private productImage: File;
  private checker: generalChecker;
  private userNotify: userNotifications;

  constructor(private productsService:ProductsManagementService) {
    this.userNotify= new userNotifications(); 
    this.registeringProduct=false;
    this.checker= new generalChecker();
    this.saleModes=globalsVars.saleModes;
    this.currentItem=this.saleModes[0].symbol;
    this.getProductTypes();
  }

  /**
   * 
  * @param event contains files that are selected
   */
  public fileChangeEvent(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.productImage = fileList[0];
    }

  }


  public resetForm(){
    (document.getElementById("nam") as HTMLInputElement).value="";
    (document.getElementById("desc") as HTMLInputElement).value="";
    (document.getElementById("cod") as HTMLInputElement).value="";
    (document.getElementById("pri") as HTMLInputElement).value="";   
    (document.getElementById("cant") as HTMLInputElement).value="";
  }


  public registerProduct(){
    /*remember to add enterpriseID then when the system have all products component
          maybe you can get it through local storage
        */
    let array: Array<any>=[
      1,
      (document.getElementById("nam") as HTMLInputElement).value,
      (document.getElementById("desc") as HTMLInputElement).value,
      (document.getElementById("cod") as HTMLInputElement).value,
      this.selectedType.o_producttypeid,
      (document.getElementById("pri") as HTMLInputElement).value,
      this.currentItem,   
      (document.getElementById("cant") as HTMLInputElement).value
      ]
    if (this.checker.notNullValues(array)  == true && this.productImage!= undefined)  {
        this.registeringProduct=true;

       
        this.productsService.registerProduct(this.productImage,array).subscribe(
          (res) =>{
            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨***********+");
            console.log("res");
            console.log(res);
            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨***********+");
            if (res.response === true){
              this.userNotify.notify(3,"El producto ha sido registrado", "Notificación del sistema");
              this.resetForm();
            }
            else{
              this.userNotify.notify(1,res.message, "Notificación del sistema");
            }
            this.registeringProduct=false;
          },
          (err) => {
            console.log(err.json());   
            this.registeringProduct=false;
          });
    }
    else{
      this.userNotify.notify(1,"Algún campo del formulario se encuentra vacío","Notificación del sistema");
    }
  }

  public getProductTypes(){
      this.productsService.getProductTypes().subscribe(
        (res) =>{
    
          if (res.response === true){
            this.productTypes=res.data;
            this.selectedType=this.productTypes[0];
          }
        },
        (err) => {
          console.log(err.json());   
        });
  }

  ngOnInit() {
  }

}
