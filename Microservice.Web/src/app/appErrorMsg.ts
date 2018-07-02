
import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,NgControl ,FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PasswordMatchService} from './Services/index';



@Component({
    selector: 'control-messages',
    template: ``
  })
 
    
export class appMessagesComponent {
   
    @Input() control: FormControl;
   
    constructor( ) { }

    // get errorMessage() {
    //   for (let propertyName in this.control.errors) {
    //     if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
    //       return PasswordMatchService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
    //     }
    //   }
  
    //   return null;
    // }
  }