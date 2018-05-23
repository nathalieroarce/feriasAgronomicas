import { Injectable } from '@angular/core';
import { Http,RequestOptions,RequestOptionsArgs, Headers} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
//import globals vars
import * as globalVars from '../../../globals';
@Injectable()
export class ProductsManagementService {

 private url= globalVars.apiUrl;

  constructor(private http:Http) { }

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

}
