import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import * as globalVars from '../../../../globals';

class orderItem {
  constructor(public orderID: Number,
              public direction: string,
              public orderDate: Date,
              public observations: string,
              public expressService: boolean,
              public totalAmount: Number) {
  }
}

@Injectable()
export class OrdersService {
  private url= globalVars.apiUrl;
  results:  orderItem[];

  constructor(private http:Http) { 
    this.results=[];
  }

  getPendingOrders(){

      let promise = new Promise((resolve, reject) => {
        let apiURL = this.url+`getPendingOrders`;
        this.http.get(apiURL)
            .toPromise()
            .then(
                res => { // Success
                  this.results = res.json().results.map(item => {
                    return new (
                        item.o_orderid,
                        item.o_directionname,
                        item.o_orderDate,
                        item.o_observation,
                        item.o_expressservice,
                        item.o_totalAmount
                    );
                  });
                  
                  resolve(); //notify that the process was successful
                },
                msg => { // Error
                  reject(msg);
                }
            );
      });
      return promise;
    }
  

  cancelOrder(orderID:Number, justification: String){

  }

}
