import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/index'
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debug } from 'util';
import { AlertService } from 'ngx-alerts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  myform: FormGroup;
  data: any;
  name: string;
  token: any;
  UserName: any;
  EmailId: any;
  EmployeeId: any;
  EmployeeNo: any;
  ImageUrl: any;
  NewUser: any;
  ReportingManager: any;
  Designation: any;
  Department: any;
  Organization: any;
  Roles: any;
  ReviewCycle: any;
  Status:any;
  Message:any;

  constructor(private router: Router, private LoginService: ServicesService, private alertService: AlertService) {

    this.myform = new FormGroup({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit() {
   
    if (localStorage.getItem('userResponse') !== null && JSON.parse(localStorage.getItem('userResponse')).NewUser == false) {
  
      this.router.navigate(['user', 'master']);
    }
  }

  OnSubmit() {
    if ((this.myform.controls["Username"].valid) && (this.myform.controls["Password"].valid)) {
      this.data = this.myform.getRawValue();
      this.LoginService.loginadmin(
        this.data
      ).subscribe(
        data => {
          debugger;
          if(data.Status == 401)
          {
            this.alertService.danger('Your Login credentials are Incorrect !!');
          }
          else
          {
          this.token = JSON.parse(localStorage.getItem('userResponse')).Access_Token;
          this.Message = JSON.parse(localStorage.getItem('userResponse')).Message;
          this.Status = JSON.parse(localStorage.getItem('userResponse')).Status;

          this.router.navigate(['user', 'master']);
          }
        },
        error => {
          if (error.status == 500) {
            debugger;
            this.alertService.danger('Internal Server Error');

          } else if (error.status == 401) {
            debugger;
            this.alertService.danger('Your Login credentials are Incorrect !!');

          } else {
            debugger;
            error = error.json();
            this.alertService.danger('Please try again !!');
          }
        });
    }
  }
}





