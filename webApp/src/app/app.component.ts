import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private title: string = 'My first AGM project';
  private lat: number;
  private lng: number;

  constructor(){
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



}
