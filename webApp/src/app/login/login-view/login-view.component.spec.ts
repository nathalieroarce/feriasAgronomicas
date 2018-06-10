import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginViewComponent } from './login-view.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as globalsVars from '../../../globals';
import { LoginMainViewComponent } from '../login-main-view/login-main-view.component';
import { EnterpriseRegistrationComponent } from '../enterprise-registration/enterprise-registration.component';
import { EnterpriseRegistrationService } from '../../services/login/enterprise-registration.service';
import { Http, HttpModule } from '@angular/http';


describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,RouterModule,CommonModule,HttpModule,RouterTestingModule], 
      declarations: [LoginViewComponent], providers:[EnterpriseRegistrationService]
     })
    .compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should be an invalid form when is empty', ()=>{
    expect(component.signUp.valid).toBeFalsy();
  });

  it('email field empty at the beginning', () => {
    let email = component.signUp.controls['userEmail']; 
    expect(email.valid).toBeFalsy(); 
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  
  it('email field empty with wrong format', () => { 
    component.signUp.controls['userEmail'].setValue("alguiengmail.com");
    let email = component.signUp.controls['userEmail'];
    expect(email.valid).toBeFalsy(); 
    let errors= email.errors || {};
    expect(errors['pattern']).toBeTruthy();
    
  });

  it('email field empty with correct format', () => { 
    component.signUp.controls['userEmail'].setValue("alguien@gmail.com");
    let email = component.signUp.controls['userEmail'];
    expect(email.valid).toBeTruthy(); 
    let errors= email.errors || {};
    expect(errors['pattern']).toBeFalsy();
    
  });

  it('password empty fiel validity', () => {
    let pass = component.signUp.controls['passw']; 
    expect(pass.valid).toBeFalsy(); 
    let errors = pass.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('password with less than five characters validity', () => {
    component.signUp.controls['passw'].setValue("agol");
    let pass = component.signUp.controls['passw']; 
    
    expect(pass.valid).toBeFalsy(); 
    let errors = pass.errors || {};
    expect(errors['minlength']).toBeTruthy();

  });

  it('password with more than ten characters validity', () => {
    component.signUp.controls['passw'].setValue("agolsddsssdsddsd");
    let pass = component.signUp.controls['passw']; 
    
    expect(pass.valid).toBeFalsy(); 
    let errors = pass.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    
  });

  it('password with correct number of characters', () => {
    let pass = component.signUp.controls['passw']; 
    expect(pass.valid).toBeFalsy();
    component.signUp.controls['passw'].setValue("agol34e");  
    let errors = pass.errors || {};
    expect(pass.valid).toBeTruthy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    
  });

  it('Should not do login successfully', ()=>{
    expect(component.signUp.valid).toBeFalsy();
    component.signUp.controls['userEmail'].setValue("alguien@gmail.com");
    component.signUp.controls['passw'].setValue("asw34f");
    expect(component.signUp.valid).toBeTruthy();
    component.onFormSubmit();
    expect(JSON.parse(localStorage.getItem("enterpriseID")).ID).toBe(-1);

  });

  it('Should do login successfully', ()=>{
    expect(component.signUp.valid).toBeFalsy();
    component.signUp.controls['userEmail'].setValue("julio@gmail.com");
    component.signUp.controls['passw'].setValue("juliomh");
    expect(component.signUp.valid).toBeTruthy();
    component.onFormSubmit();
    expect(JSON.parse(localStorage.getItem("enterpriseID")).ID).toBe(2);

  });

});
