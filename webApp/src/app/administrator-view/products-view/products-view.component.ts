import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../services/administrador-view/products-management.service';
import { userNotifications } from '../../models/userNotifications';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as globalsVars from '../../../globals';
declare var swal:any;


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  enterpriseID: Number;
  productID: Number;
  selectedType: any;
  productTypes: any;
  productImage: File;
  productNewImage : File;
  productUnit: string;
  saleModes:any;
  userNotify: userNotifications;
  productForm: FormGroup;
  updatingProduct : Boolean;


  constructor(public products: ProductsManagementService) {
    this.userNotify = new userNotifications();
    this.enterpriseID= JSON.parse(localStorage.getItem("enterpriseID")).ID;
    this.getProductTypes();
    this.saleModes = globalsVars.saleModes;
    this.productForm = new FormGroup({
      productName : new FormControl('', Validators.required),
      productPrice : new FormControl('', Validators.required),
      productDescription : new FormControl('', Validators.required),
      productStock : new FormControl('', Validators.required)});
  }

  public getProductTypes() {
    this.products.getProductTypes().subscribe(
      (res) => {

        if (res.response === true) {
          this.productTypes = res.data;
          this.selectedType = this.productTypes[0];
          this.loadProducts();
        }
      },
      (err) => {
        console.log(err.json());
      });
  }

  public loadProducts() {
    this.products.getProducts(this.enterpriseID, this.selectedType.o_producttypeid);
  }

  public fileChangeEvent(event){
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.productNewImage = fileList[0];
    }

  }

  public setAction(product: any){
    this.productID = product.productID;
    this.productImage = product.image;
    this.productUnit = product.unit;
    this.productForm.setValue({productName: product.name, productPrice: product.price, productDescription : product.description, productStock : product.stock});
  }

  public updateInfoProduct(){
    
    this.updatingProduct = true;
    let array : Array<any> = [
      this.productID,
      this.productForm.get('productName').value,
      this.productForm.get('productPrice').value,
      this.productUnit,
      this.productForm.get('productDescription').value,
      this.productForm.get('productStock').value
    ];

    if (this.productNewImage !== undefined){
      this.products.updateProduct(this.productNewImage, array,true,"").subscribe(
        (res) => {
          if (res.response === true) {
            this.userNotify.notify(3,"El producto ha sido actualizado", "Notificación del sistema");
            (document.getElementById('imageFile') as HTMLInputElement).value = '';
            this.updatingProduct = false;
          }
          else {
            this.userNotify.notify(1, res.message, "Notificación del sistema");
            this.updatingProduct = false;
          }
          this.productNewImage=undefined;
        },
        (err) => {
          console.log(err.json());
        });
    }
    else{
      this.products.updateProduct(this.productImage, array,false,this.productImage).subscribe(
        (res) => {
          if (res.response === true) {
            this.userNotify.notify(3,"El producto ha sido actualizado", "Notificación del sistema");
            (document.getElementById('imageFile') as HTMLInputElement).value = '';
            this.updatingProduct = false;
          }
          else {
            this.userNotify.notify(1, res.message, "Notificación del sistema");
            this.updatingProduct = false;
          }
        },
        (err) => {
          console.log(err.json());
        });
    }

  }

  ngOnInit(){
  }

}
