import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-enterprise-profile',
  templateUrl: './enterprise-profile.component.html',
  styleUrls: ['./enterprise-profile.component.css']
})
export class EnterpriseProfileComponent implements OnInit {

  enterpriseID:Number;
  constructor(public enterpriseService: ProfileService) { 
    this.enterpriseID= JSON.parse(localStorage.getItem("enterpriseID")).ID;
    this.getData(this.enterpriseID,this.enterpriseService);
  }

  public getData (enterpriseID: Number, service:ProfileService){
    this.enterpriseService.getInformation(enterpriseID);
  }

  ngOnInit() {
  }

}
