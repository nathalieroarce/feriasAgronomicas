import { Injectable } from '@angular/core';
import { Http,RequestOptions,RequestOptionsArgs, Headers} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
//import globals vars
import * as globalVars from '../../../globals';
@Injectable()
export class EnterpriseRegistrationService {

  private url= globalVars.apiUrl;

  constructor(private http:Http) { }



  public registerEnterprise(image:File, data: Array<any>){
    
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('name', data[0]);
    formData.append('description', data[1]);
    formData.append('responsableName', data[2]);
    formData.append('responsableIDCardNumber', data[3]);
    formData.append('email', data[4]);
    formData.append('telephoneNumber', data[5]);
    formData.append('password', data[6]);
    formData.append('price', data[7]);
    formData.append('enterpriseLocation', data[8]);
    formData.append('enterpriseDeliveryPointLocation', data[9]);
    formData.append('expressService', data[10]);
    formData.append('locationName', data[11]);


    //add the other data

    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const body = JSON.stringify({ headers: headers });
    return this.http.post(this.url+`registerEnterprise`,formData,body)
    .map(res => 
      res.json()); 
  }


}
