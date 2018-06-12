import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { EnterpriseRegistrationService } from '../../services/login/enterprise-registration.service';
import { userNotifications } from '../../models/userNotifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  signUp:FormGroup;
  userNotify: userNotifications;

  constructor( public loginService: EnterpriseRegistrationService, public router:Router) { 
   
   this.userNotify=new userNotifications(); 

   this.signUp= new FormGroup({userEmail: new FormControl('',[Validators.required, 
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
  
   ),
   passw: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(10)])
  });

  }

  onFormSubmit(){
  
    this.loginService.logIn(this.signUp.value.userEmail, this.signUp.value.passw).then
      (response =>{
        
        if (response== -1){
          localStorage.setItem("enterpriseID", JSON.stringify({"ID":response}) );
          this.userNotify.notify(1,"Los datos ingresados no pertenecen a un usuario válido", "Notificación del sistema");
        }
        else{
          //save data in local storage
          localStorage.setItem("enterpriseID", JSON.stringify({"ID":response}) );
          this.router.navigate(["/enterpriseView/main"]); 
        }
      });
    

  }
  

  ngOnInit() {

  }

}
