import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ServicesService } from '../Services/index';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeePocService } from '../Services/employee-poc.service';
import { RatingDetailsComponent } from '../rating-details/rating-details.Component';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  EmployeeList: any;
  DepartmentList: any;

  empForm: FormGroup;
  name;
  email;
  age;
  gender;
  department;

  constructor(public _dialog: MatDialog, private router: Router, private _PocService: EmployeePocService) {

    this.empForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required])
    });

    // this.LoadDepartmentData();
    // this.LoadEmployeeData();
    // this.ResetForm();
  }

  //Employee Data Loads here
  ngOnInit() {
    this.LoadDepartmentData();
    this.LoadEmployeeData();
    this.ResetForm();
  }

  EditEmployee(empData) {
    this.empForm.controls['id'].setValue(empData.Id);
    this.empForm.controls['name'].setValue(empData.Name);
    this.empForm.controls['email'].setValue(empData.Email);
    this.empForm.controls['age'].setValue(empData.Age);
    this.empForm.controls['gender'].setValue(empData.Gender);
    this.empForm.controls['department'].setValue(empData.DeptId, { onlySelf: true });
  }

  // // Loads Department Data
  // LoadData() {
  //   this._RatingService.DepartmentData(
  //   ).subscribe(
  //     Data=>{
  //       this.DepartmentList = Data.Departments;
  //   });
  //       }

  AddEmployee(empData) {
    var data = {
      Name: empData.controls["name"].value,
      Email: empData.controls["email"].value,
      Age: empData.controls["age"].value,
      Gender: empData.controls["gender"].value,
      DeptartmentId: empData.controls["department"].value
    };

    this._PocService.AddEmployee(data).subscribe(
      Data => {
        this.LoadEmployeeData();
        this.ResetForm();
      });
  }

  UpdateEmployee(empData) {
    var data = {
      Id: empData.controls["id"].value,
      Name: empData.controls["name"].value,
      Age: empData.controls["age"].value,
      Gender: empData.controls["gender"].value,
      DeptartmentId: empData.controls["department"].value
    };

    this._PocService.UpdateEmployee(data).subscribe(
      Data => {
        this.LoadEmployeeData();
        this.ResetForm();
      });
  }

  Select(DeptId, DeptName) {
    let value = btoa(DeptId + ':' + DeptName); //Encryption
    this.router.navigate(['user/ratings'], { queryParams: { data: value } }); //encrypted parameters in URL
  }

  DeleteEmployee(Id) {
    this._PocService.DeleteEmployee(Id).subscribe(
      Data => {
        this.LoadEmployeeData();
        this.ResetForm();
      });
  }

  // Laads Employees Data..
  LoadEmployeeData() {
    this._PocService.EmployeeData(
    ).subscribe(
      Data => {
        this.EmployeeList = Data["Employees"];
      });
  }


  // Loads Department Data..
  LoadDepartmentData() {
    this._PocService.DepartmentData(
    ).subscribe(
      Data => {
        //this.EmployeeList = Data;
        this.DepartmentList = Data["Departments"];
      });
  }

  ResetEmployee() {
    this.ResetForm();
  }

  ResetForm() {
    this.empForm.reset();
  }
}
