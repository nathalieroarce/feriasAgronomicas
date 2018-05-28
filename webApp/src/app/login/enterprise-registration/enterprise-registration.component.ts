import { Component, OnInit } from '@angular/core';

import {enterpriseRegistrationModel} from '../../models/login/enterpriseRegistrationModel';
import { generalChecker } from '../../models/generalChecker';
import { userNotifications } from '../../models/userNotifications';
import { EnterpriseRegistrationService } from '../../services/login/enterprise-registration.service';

/**
 * Important to declare this var for get
 * the name of the place according to
 * latitude and longitude value
 *
 */
declare var google:any;

@Component({
  selector: 'app-enterprise-registration',
  templateUrl: './enterprise-registration.component.html',
  styleUrls: ['./enterprise-registration.component.css']
})
export class EnterpriseRegistrationComponent implements OnInit {
  private userNotify: userNotifications;
  private provideExpress:Boolean;
  /**
   * coordinates x,y
   * x= latitude, y= longitud
   */
  private checker: generalChecker;
  private enterpriseLocation:Array<Number>;
  private enterpriseDeliveryPointLocation: Array<Number>;
  private enterpriseLocationName:String;
  private registeringEnterprise: Boolean;
  private enterpriseImage: File;
  private pricePerKM:Number;

  constructor(private enterpriseRegistrationService: EnterpriseRegistrationService) {
    this.checker= new generalChecker();
    this.pricePerKM=0;
    this.registeringEnterprise=false;
    this.userNotify= new userNotifications();
    this.provideExpress=false;
    this.enterpriseLocation=new Array();
    this.enterpriseDeliveryPointLocation= new Array();
    this.enterpriseLocationName= "Desconocida" ;

    //set price for express service by default
    this.setCurrentPosition();
  }


  //get user current position
  public setCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => {

      //updates vars that contain maps current position
      this.enterpriseLocation.push(position.coords.latitude);
      this.enterpriseDeliveryPointLocation.push(position.coords.latitude);
      this.enterpriseLocation.push(position.coords.longitude);
      this.enterpriseDeliveryPointLocation.push(position.coords.longitude);
    });

  }



  /**
   * Go to register the company,
   *
   */
  public registerEnterprise(environment){

    

    //check if passwords are not equals
    if ((document.getElementById("passw") as HTMLInputElement).value !=
        (document.getElementById("pass") as HTMLInputElement).value){
          this.userNotify.notify(1,"Las contraseñas no coinciden","Notificación del sistema");
          return;
    }

    let array: Array<any>=[
      (document.getElementById("name") as HTMLInputElement).value,
      (document.getElementById("des") as HTMLInputElement).value,
      (document.getElementById("res") as HTMLInputElement).value,
      (document.getElementById("ced") as HTMLInputElement).value,
      (document.getElementById("email") as HTMLInputElement).value,
      (document.getElementById("cel") as HTMLInputElement).value,
      (document.getElementById("passw") as HTMLInputElement).value,
      this.pricePerKM
      ]

      if (this.checker.notNullValues(array)  == true && this.enterpriseImage!=undefined )  {

        
        array.push(this.enterpriseLocation);
        array.push(this.enterpriseDeliveryPointLocation);
        array.push(this.provideExpress);
        array.push(this.enterpriseLocationName);

        environment.registeringEnterprise=true;
        
        this.enterpriseRegistrationService.registerEnterprise(this.enterpriseImage,array).subscribe(
          (res) =>{
            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨***********+");
            console.log("res");
            console.log(res);
            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨***********+");
            if (res.response === true){
              this.userNotify.notify(3,"La empresa ha sido registrada", "Notificación del sistema");
              this.resetForm();
            }
            else{
              this.userNotify.notify(1,"Ocurrió un error en el registro de la empresa", "Notificación del sistema");
            }
            environment.registeringEnterprise=false;
          },
          (err) => {
            console.log(err.json());
            environment.registeringEnterprise=false;
          });
    }
    else{
      this.userNotify.notify(1,"Algún campo del formulario se encuentra vacío","Notificación del sistema");
    }
  }

  public initRegistration(){
    this.getNameOfPosition(this.enterpriseLocation);
  }

  /**
   * get the name of the place that latitude and longitude represent
   * @param position represent the enterprise location to then obtain the name
   *        of the place that belongs to that location
   */
  public getNameOfPosition(position: Array<any>){

 

    var latlng = {
      lat: position[0],
      lng: position[1]
    };
    let that=this;
    var geocoder = new google.maps.Geocoder;
     geocoder.geocode({
    'location': latlng
     // ej. "-34.653015, -58.674850"
    }, function(results, status) {
      // si la solicitud fue exitosa
      if (status === google.maps.GeocoderStatus.OK) {
        // si encontró algún resultado.
        if (results[1]) {
          that.enterpriseLocationName= results[1].formatted_address;
          that.registerEnterprise(that);
        }
        else{
          this.userNotify.notify(1,"El registro no puede realizarse debido"+
          " a que no fue posible obtener el nombre del lugar donde se ubica la empresa","Notificación del sistema");

        }
      }
});
  }
  public resetForm(){
    (document.getElementById("name") as HTMLInputElement).value="",
    (document.getElementById("des") as HTMLInputElement).value="",
    (document.getElementById("res") as HTMLInputElement).value="",
    (document.getElementById("ced") as HTMLInputElement).value="",
    (document.getElementById("email") as HTMLInputElement).value="",
    (document.getElementById("cel") as HTMLInputElement).value="",
    (document.getElementById("passw") as HTMLInputElement).value="",
    (document.getElementById("pass") as HTMLInputElement).value="",
    this.pricePerKM=0,
    this.provideExpress=false;
    this.setCurrentPosition();

  }



  /**
   *
  * @param event contains files that are selected
   */
  public fileChangeEvent(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.enterpriseImage = fileList[0];
    }

  }



  /**
   *
   * @param locationEvent contains the latitude and logitud clicked
   * @param enterpriseLocation to know is the change  of location was in enterprise location or
   * in delivery point
   */
  public changeLocation(locationEvent:any, enterpriseLocationChange){
    if (enterpriseLocationChange===true){
      this.enterpriseLocation[0]= locationEvent.coords.lat;
      this.enterpriseLocation[1]= locationEvent.coords.lng;
    }
    else{
      this.enterpriseDeliveryPointLocation[0]= locationEvent.coords.lat;
      this.enterpriseDeliveryPointLocation[1]= locationEvent.coords.lng;
    }

  }

  ngOnInit() {
  }

}
