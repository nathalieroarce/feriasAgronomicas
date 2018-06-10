import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Http,RequestOptions,RequestOptionsArgs, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as globalVars from '../../globals';


class Enterprise {
  constructor(public name: String,
              public image: String,
              public description: String,
              public representative: String,
              public mail:String,
              public telephone: String,
              public chargePerKilometer: Number, 
              public location: String,
              public expressService: String) {
  }
}


@Injectable()
export class ProfileService {
  private url= globalVars.apiUrl;
  public enterprise: Enterprise;

  constructor(private http:Http) { 
    this.enterprise= new Enterprise(null,null,null,null,null,null,null,null,null);
  }

  public getInformation(enterpriseID:Number){

    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url+`getEnterpriseInformation?enterpriseID=${enterpriseID}`;
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.enterprise= new Enterprise(
                  res.json().data[0].o_name,
                  res.json().data[0].o_image,
                  res.json().data[0].o_description,
                  res.json().data[0].o_representative,
                  res.json().data[0].o_mail,
                  res.json().data[0].o_telephone,
                  res.json().data[0].o_chargeperkilometer,
                  res.json().data[0].o_locationname,
                  null
                );

              
                if (res.json().data[0].o_expressservice === true){
                  this.enterprise.expressService="Sí";
                }
                else{
                  this.enterprise.expressService="No";
                }
                resolve(); //notify that the process was successful
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

}
