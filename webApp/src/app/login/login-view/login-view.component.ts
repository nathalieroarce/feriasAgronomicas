import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  private signUp:FormGroup;
  //private userEmail: FormControl;
 // private passw: FormControl;

  constructor() { 

   this.signUp= new FormGroup({userEmail: new FormControl('',[Validators.required, 
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
   passw: new FormControl('', Validators.required)});

  }

  onFormSubmit(){
    alert("a inicio de sesión");
  }
  

  ngOnInit() {
  }

}
