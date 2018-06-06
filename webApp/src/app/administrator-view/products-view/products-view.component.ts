import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../services/administrador-view/products-management.service';
import { userNotifications } from '../../models/userNotifications';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {product} from "../../models/administratorView/product";

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  private enterpriseID: Number;
  private productID: Number;
  private selectedType: any;
  private productTypes: any;
  //private productImage: File;
  private productUnit: string;
  private userNotify: userNotifications;
  private productForm: FormGroup;


  constructor(private products: ProductsManagementService) {
    this.userNotify = new userNotifications();
    this.enterpriseID = 1;
    this.getProductTypes();
    this.productForm = new FormGroup({
      productName : new FormControl('', Validators.required),
      productPrice : new FormControl('', Validators.required),
      productDescription : new FormControl('', Validators.required),
      productStock : new FormControl('', Validators.required),
      productImage : new FormControl('', Validators.required)});
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

  public setAction(product: any){
    this.productID = product.productID;
    this.productForm.setValue({productName: product.name, productPrice: product.price, productDescription : product.description, productStock : product.stock, productImage : product.image});
    this.productUnit = product.unit;
  }

  public updateInfoProduct(){
    console.log('intento');
    //this.products.updateProduct();
  }

  ngOnInit() {
  }

}
