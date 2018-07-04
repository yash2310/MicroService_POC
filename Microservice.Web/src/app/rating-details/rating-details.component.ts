import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeePocService } from '../Services/employee-poc.service';

@Component({
  selector: 'app-rating-details',
  templateUrl: './rating-details.component.html',
  styleUrls: ['./rating-details.component.css']
})

export class RatingDetailsComponent implements OnInit {
  myform: FormGroup;
  RatingWeightage: Number;
  RatingComment: String;
  show: Boolean = false;
  Rater: any;
  Ratee: any;
  Designation: any;
  Organization: any;
  Cycle: any;
  RateData: any;
  OrganizationGoal: any;
  EmployeeGoal: any;
  ManagerialGoal: any;
  DesignationGoal: any;
  email: any;
  name: any;
  FormData: any;
  reporteeId: any;
  Dshow: any;
  Eshow: any = false;
  Oshow: any = false;
  empId: any; // can be of reportee / reviewee..
  rt: number = 0;
  ct: string = '';
  Show: number = 0;
  mergedArray: any;
  message: any;
  DesignationId: any;
  UserType: any;
  user: any;
  DeptId: any;
  EmployeeList: any;
  DeptName: any;

  constructor(private _PocService: EmployeePocService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    //Decryption for Name/Email/Role
    this.activatedRoute.params.subscribe((params: Params) => {
      let decryptedValue = atob(this.activatedRoute.snapshot.queryParams['data']);
      let data = decryptedValue.split(":");
      if (data == null)
        this.router.navigate(['user', 'employeerating']);
      this.DeptId = data[0];
      this.DeptName = data[1];
    });

    this.LoadRatingGoals();
  }

  ngOnInit() {
  }



  Back() {
    this.router.navigate(['user/master']);
  }


  // LOads Rating Goals..
  LoadRatingGoals() {
    this._PocService.EmployeeDataByDeptId(this.DeptId
    ).subscribe(
      Data => {
        this.EmployeeList = Data.Employees;
      });
  }
}