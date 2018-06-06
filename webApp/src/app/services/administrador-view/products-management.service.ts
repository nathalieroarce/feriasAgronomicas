import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import * as globalVars from '../../../globals';


class productItem {
  constructor(public productID: Number,
              public name: string,
              public price: Number,
              public unit: string,
              public image: string,
              public description: string,
              public stock: Number) {
  }
}

@Injectable()
export class ProductsManagementService {

  private url = globalVars.apiUrl;
  public results: Array<productItem>;

  constructor(private http: Http) {
    this.results = new Array<productItem>();
  }

  public deleteFromProduccts(productID: Number): Boolean {

    let size = this.results.length;
    for (let index = 0; index < size; index++) {
      if (this.results[index].productID === productID) {
        this.results.splice(index, 1);
        return true;

      }

    }

    return false;
  }


  public getProductTypes(){
    return this.http.get(this.url+`getProductTypes`)
    .map(res =>
      res.json());
  }

  public registerProduct(image:File, data: Array<any>){

    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('enterpriseID', data[0]);
    formData.append('name', data[1]);
    formData.append('description', data[2]);
    formData.append('code', data[3]);
    formData.append('productType', data[4]);
    formData.append('price', data[5]);
    formData.append('unit', data[6]);
    formData.append('stock', data[7]);


    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const body = JSON.stringify({ headers: headers });
    return this.http.post(this.url+`registerProduct`,formData,body)
    .map(res =>
      res.json());
  }


  public getProducts(enterpriseID:Number, productType:Number){

    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url+`getProductsByType?enterpriseID=${enterpriseID}`+`&productType=${productType}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            this.results = res.json().data.map(item => {
              return new productItem(
                item.o_id,
                item.o_name,
                item.o_price,
                item.o_unit,
                item.o_image,
                item.o_description,
                item.o_stock
              );
            })
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  public updateProduct(image: File, data: Array<any>){

    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('produtID', data[0]);
    formData.append('name', data[1]);
    formData.append('price', data[2]);
    formData.append('unit', data[3]);
    formData.append('description', data[4]);
    formData.append('stock', data[5]);


    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const body = JSON.stringify({ headers: headers });
    return this.http.post(this.url+`updateProductInformation`,formData,body)
      .map(res =>
        res.json());
  }

}
