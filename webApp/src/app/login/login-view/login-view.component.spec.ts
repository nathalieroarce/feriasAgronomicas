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


describe('LoginViewComponent', () => {  //especifica el componente que será probado
  let component: LoginViewComponent; //variable global que contendrá una instancia del componente
  let fixture: ComponentFixture<LoginViewComponent>;  
  /*fixture es el contenedor para el componente 
  login view y su plantilla (html)
  */

  beforeEach(() => { //antes de cada prueba se genera un componente
    //Testbed es un framework interno de angular que permite testear comportamientos de los
    //componentes de un programa en angular
    TestBed.configureTestingModule({ /*configura el módulo de prueba para que sea 
      similar al módulo real al que pertenece el componente  
      */
      /*Para testear el componente se requiere especificar los imports y providers que posee 
      el módulo al que al que pertence. En declarations se especifica el componente a probar
      */
      imports: [ReactiveFormsModule, FormsModule,RouterModule,CommonModule,HttpModule,RouterTestingModule], 
      declarations: [LoginViewComponent], providers:[EnterpriseRegistrationService]
     })
    .compileComponents();

    //Se genera un contenedor fixture que contiene la instancia del componente
    fixture = TestBed.createComponent(LoginViewComponent);
    //se obtiene la instancia del componente contenida en la variable fixture
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  /*
  function it especifica el inicio de un caso de prueba
    y como primer parámetro recibe el nombre del caso de prueba.
  */

  /*
   expect recibe un parámetro que es el objeto a verificar, y contiene un conjunto 
   de funciones de comparación
  */
  it('should create', () => { 
    expect(component).toBeTruthy(); 
    /*
    Compara que la instancia de componente es generada correctamente
    */
  });

  it('It should be an invalid form when is empty', ()=>{
    /*
    Comprueba si el estado de la variable form (de inicio de sesion) tiene
    un estado invalido cuando el formulario está vacio
    */
    expect(component.signUp.valid).toBeFalsy();  //compara el estado del form con false
  });

  it('email field empty at the beginning', () => {
    //obtener el formControl con el nombre especificado.
    let email = component.signUp.controls['userEmail']; 
    expect(email.valid).toBeFalsy(); //compara si el estado de la entrada email es inválida
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy(); 
    /* verifica si la restricción requerido del email
      está activida
    */

  });

  
  it('email field  with wrong format', () => { 
    //asignar a la entrada email un valor con formato incorrecto
    component.signUp.controls['userEmail'].setValue("alguiengmail.com");
    let email = component.signUp.controls['userEmail'];
    expect(email.valid).toBeFalsy(); 
    let errors= email.errors || {};
    expect(errors['pattern']).toBeTruthy();
    /*
     verifica si la restricción pattern que especifica el formato del correo esta activada(true)
     lo que significa que el correo tiene un formato incorrecto
    */
    
  });

  it('email field with correct format', () => { 
    //asignar a la entrada correo un formato correcto
    component.signUp.controls['userEmail'].setValue("alguien@gmail.com");
    let email = component.signUp.controls['userEmail'];
    expect(email.valid).toBeTruthy(); 
    let errors= email.errors || {};
    /*
    verifica si la restricción del correo está desactiva para un formato válido
    */
    expect(errors['pattern']).toBeFalsy();
    
  });

  it('password empty fiel validity', () => {
    //obtener la referencia a la entrada contraseña del formulario
    let pass = component.signUp.controls['passw']; 
    /*
    Si está vacía el atributo valid debe ser false
    */
    expect(pass.valid).toBeFalsy();  

    let errors = pass.errors || {};
    /*
    Entonces la restricción required debe estar activa
    */
    expect(errors['required']).toBeTruthy();
  });

  it('password with less than five characters validity', () => {
    //asignar a la entrada contraseña un valor con menos de cinco caracteres
    component.signUp.controls['passw'].setValue("agol");
    let pass = component.signUp.controls['passw']; 
    
    expect(pass.valid).toBeFalsy(); 
    let errors = pass.errors || {};
    /*
    Entonces la restricción de minlength debe estar activa (valor = true)
    */
    expect(errors['minlength']).toBeTruthy();

  });

  it('password with more than ten characters validity', () => {
    //asignar a la entrada contraseña un valor con más de 10 caracteres
    component.signUp.controls['passw'].setValue("agolsddsssdsddsd");
    let pass = component.signUp.controls['passw']; 
    
    expect(pass.valid).toBeFalsy(); 
    let errors = pass.errors || {};
     /*
    Entonces la restricción de maxlenght debe estar activa (valor = true)
    */
    expect(errors['maxlength']).toBeTruthy();
    
  });

  it('password with correct number of characters', () => {
    let pass = component.signUp.controls['passw']; 
    expect(pass.valid).toBeFalsy();
    //asignar a la entrada contraseña un valor valido(mayor a 4 y máximo 10)
    component.signUp.controls['passw'].setValue("agol34e");  
    let errors = pass.errors || {};
    expect(pass.valid).toBeTruthy();
    /*
    Para este caso las restricciones de min y max length 
    deben estar desactivadas (valor = false)
    */
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    
  });

  /*****************************
   * El método onFormSubmit() autentica al usuario y almacena en local storage
   * el id del mismo. Almacena -1 de tratarse de credenciales incorrectas
  ***************************/
  it('Should not do login successfully', ()=>{
    expect(component.signUp.valid).toBeFalsy();
    /*
    Usuario y contraseña que no pertenece a ningún usuario registrado
    */
    component.signUp.controls['userEmail'].setValue("alguien@gmail.com");
    component.signUp.controls['passw'].setValue("asw34f");
    expect(component.signUp.valid).toBeTruthy();
    component.onFormSubmit(); //llamada a la función del componente que autentica el usuario
    /*
    Se espera que el valor almacenado en local storage sea -1.
    */
    expect(JSON.parse(localStorage.getItem("enterpriseID")).ID).toBe(-1);

  });

  it('Should do login successfully', ()=>{
    expect(component.signUp.valid).toBeFalsy();
    /*
    Usuario y contraseña que sí pertenece a un usuario registrado
    */
    component.signUp.controls['userEmail'].setValue("julio@gmail.com");
    component.signUp.controls['passw'].setValue("juliomh");
    expect(component.signUp.valid).toBeTruthy();
    component.onFormSubmit();
    /*
    Se espera que el valor almacenado en local storage sea 2 (se sabe de antemano que
    el id de ese usuario era 2. Otra forma hubiese sido comparando que fuera diferente de -1)
    */
    expect(JSON.parse(localStorage.getItem("enterpriseID")).ID).toBe(2);
    
    
  });

});
