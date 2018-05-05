import { Component, OnInit } from '@angular/core';

import {enterpriseRegistrationModel} from '../../models/login/enterpriseRegistrationModel';

@Component({
  selector: 'app-enterprise-registration',
  templateUrl: './enterprise-registration.component.html',
  styleUrls: ['./enterprise-registration.component.css']
})
export class EnterpriseRegistrationComponent implements OnInit {

  private enterpriseObject: enterpriseRegistrationModel;
  private lat: number;
  private lng: number;

  constructor() { 
    this.enterpriseObject= new enterpriseRegistrationModel();
    this.setCurrentPosition();
  }


  //get user current position
  public setCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => {
     
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      
    });
  }

  public changeLocation(locationEvent:any){
    this.lat=locationEvent.coords.lat;
    this.lng= locationEvent.coords.lng;
      
  }

  ngOnInit() {
  }

}
