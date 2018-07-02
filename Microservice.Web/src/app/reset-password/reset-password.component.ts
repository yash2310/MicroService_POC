import { Component, OnInit } from '@angular/core';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { PasswordMatchService } from '../Services/index';
import 'rxjs/Rx';
import { debug } from 'util';
import { ServicesService } from '../Services/index';
import { AlertService } from 'ngx-alerts';
//import { PasswordValidation } from './password-validation';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  myform: FormGroup;
  data: any;
  newpass: any;
  msg: any;
  ConfirmPassword: any;
  UserId:any;
  UserName: any;
  status: any;
  SubmitStatus: boolean = false;

  constructor(private router: Router, private ResetService: ServicesService, private alertService: AlertService, private fb: FormBuilder) {
    this.myform = this.fb.group({
      newpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
      { validator: this.areEqual }
    );
  
    // this.status = this.areEqual;
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('userResponse')).NewUser == false) {
      this.router.navigate(['user', 'master']);
    }
  }

  OnSubmit() {
    this.SubmitStatus = true;
    this.UserId = JSON.parse(localStorage.getItem('userResponse')).EmployeeId;
    this.UserName = JSON.parse(localStorage.getItem('userResponse')).EmailId;
    this.ConfirmPassword = this.myform.controls['confirm'].value;
    //this.data = this.myform.getRawValue();
    // 
    this.data = {
      "UserId": this.UserId,
      "Password": this.ConfirmPassword,
      "email":this.UserName
    }
    this.ResetService.RestPasswordData(
      this.data
      //this.UserName , this.ConfirmPassword
    ).subscribe(
      data => {
        if (data == true) {
          var oldData = JSON.parse(localStorage.getItem('userResponse'));
          oldData.NewUser = false;
          localStorage.setItem('userResponse', JSON.stringify(oldData));
          this.router.navigate(['user', 'master']);
        }
      },
      //  error => { 
      //                                             
      //        if(error.status == 500){
      //         // this.name = 'Internal Server Error';
      //          this.alertService.danger('Internal Server Error');

      //          }  else if(error.status == 401){
      //            this.alertService.danger('Your Login credentials are Incorrect !!');
      //          // this.name = 'Your Login credentials are Incorrect ';
      //          }else{
      //            error = error.json();
      //            this.alertService.danger(error['message']);
      //          }
      // }
    );
  }
  private areEqual(group: FormGroup) {
    return group.get('newpassword').value === group.get('confirm').value ? null : { mismatch: true };;
  }
}
