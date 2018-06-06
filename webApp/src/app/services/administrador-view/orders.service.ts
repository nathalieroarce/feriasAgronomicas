import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Http,RequestOptions,RequestOptionsArgs, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as globalVars from '../../../globals';



class orderItem {
  constructor(public orderID: Number,
              public direction: string,
              public orderDate: Date,
              public observations: string,
              public expressService: boolean,
              public totalAmount: String) {
  }
}

@Injectable()
export class OrdersService {
  private url= globalVars.apiUrl;
  public results:  Array<orderItem>;

  constructor(private http:Http) {
    this.results=new Array<orderItem>();
  }

  /**
   *
   * @param orderID : id of the order to be deleted
   * @param list : order list
   */
  public deleteFromOrder(orderID: Number): Boolean {

    let size = this.results.length;
    for (let index = 0; index < size; index++) {
      if (this.results[index].orderID===orderID){
        this.results.splice(index,1);
        return true;

      }

    }

    return false;
  }

  public getOrders(endpointName:String,enterpriseID:Number){

      let promise = new Promise((resolve, reject) => {
        let apiURL = this.url+endpointName+`?enterpriseID=${enterpriseID}`;
        this.http.get(apiURL)
            .toPromise()
            .then(
                res => { // Success
                  this.results = res.json().data.map(item => {
                    return new orderItem(
                        item.o_orderid,
                        item.o_directionname,
                        item.o_orderdate.substring(0,10),
                        item.o_observations,
                        item.o_expressservice,
                        item.o_totalamount
                    );
                  })
                  resolve(); //notify that the process was successful
                },
                msg => { // Error
                  reject(msg);
                }
            );
      });
      return promise;
    }

  public cancelOrder(orderID:Number, justification: String){

    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url+`cancelOrder`;
      this.http.post(apiURL,JSON.stringify({"orderID": orderID, "justification": justification}),options)
          .toPromise()
          .then(
              res => { // Success

                resolve(res.json().response); //notify that the process was successful
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  public sendOrder(orderID:Number, deliveryDate:Date){

    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url+`sendOrder`;
      this.http.post(apiURL,JSON.stringify({"orderID": orderID, "deliveryDate": deliveryDate}),options)
          .toPromise()
          .then(
              res => { // Success
                resolve(res.json().response); //notify that the process was successful
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

}
