import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { DialogRef } from 'angular2-modal/src/models/dialog-ref';
import { ServicesService } from '../Services/index';
import { Router } from '@angular/router';
import { SessionExpireDialogComponent } from '../session-expire-dialog/session-expire-dialog.component';
import { RatingService } from '../Services/index';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { RatingModel } from '../model/RatingModel';
import { debug } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-master-page',

  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  UserName: any;
  Designation: any;
  EmailId: any;
  EmployeeNo: any;
  NewUser: any;
  SelfRater: any;
  Ratee: any;
  Id: any;
  Organization: any;
  Cycle: any;
  RateData: any;
  OrganizationGoal: any;
  EmployeeGoal: any;
  ManagerialGoal: any;
  DesignationGoal: any;
  Design: any;
  myform: FormGroup;
  DsnId: any;
  OrgId: any;
  FormData: any;
  RateId: any;
  Show: number = 0;
  message: any;
  GoalsCount: number;
  FinalRating: any;
  RateFlag: any;

  rt: number = 0;
  ct: string = '';

  EmployeeList: any;

  SaveRatingData: RatingModel; //Rating data modal required to insert..
  UserRole: any;


  constructor(public _dialog: MatDialog, private router: Router, private _RatingService: RatingService,private FlagService: ServicesService) {

    
    this.myform = new FormGroup({
      Comment: new FormControl('',[Validators.required, Validators.minLength(8)]),
      Rating: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.max(5),Validators.pattern('^(?:[0-5]|[0-5].[0-9]|0[0-5]|1)$')]))//'[0-5]+(?:\.[0-9]{0,1})?')]))   // ^(?:5(?:\.0)?|[1-6](?:\.[0-9])?|0?\.[1-9])$ 
    });
  }

  //Employee Data Loads here
  ngOnInit() {
    debugger;
    this.LoadEmployeeData();
  }

  //Rating to be submitted..
  SubmitRatings(goalData) {
    if ((this.myform.controls["Rating"].valid) && (this.myform.controls["Comment"].valid)) {
      if (goalData.Id == 0) {
        this.FormData = this.FillRatingModel(goalData);
        this._RatingService.RatingAddData(
          this.FormData
        ).subscribe(
          Data => {
            if (Data == 'Success') {
              this.LoadEmployeeData();
              this.myform.reset();
              this.rt = 0;
            this.ct = '';
            this.message = "";
            }
            else {
              this.LoadEmployeeData();
              this.myform.reset();
            }
          });
      }
      else if (goalData.Id >= 0) {
        this.FormData = this.FillRatingModel(goalData);
        this._RatingService.UpdateRatingData(
          this.FormData
        ).subscribe(
          Data => {
            if (Data == 'Success') {
              this.LoadEmployeeData();
              this.myform.reset();
              this.rt = 0;
            this.ct = '';
            this.message = "";
            }
            else {
              this.LoadEmployeeData();
              this.myform.reset();
            }
          });
      }

    } else {
       this.message = "* Please enter valid inputs";
      //this.ResetForm();
      this.LoadEmployeeData();
    }
  }

  // Data Modal Of Rating for Api..
  FillRatingModel(goalData) {

    this.SaveRatingData = new RatingModel();
    if (goalData.Id == 0) {
      this.SaveRatingData.RateId = 0; // 0 for insert case..
    }
    else {
      this.SaveRatingData.RateId = goalData.Id;
    }

    this.SaveRatingData.Rater = 0;
    this.SaveRatingData.Ratee = 0;
    if (goalData.GoalType == 4 || goalData.GoalType == 3) {
      this.SaveRatingData.TypeId = 0;
    }
    else if (goalData.GoalType == 2) {
      this.SaveRatingData.TypeId = JSON.parse(localStorage.getItem('userResponse')).Designation.Id; // Designation Id(2)
    }
    else if (goalData.GoalType == 1) {
      this.SaveRatingData.TypeId = JSON.parse(localStorage.getItem('userResponse')).Organization.Id; // Organization Id(1)
    }

    // this.myform.controls['Rating'].setValue(goalData.Rating) ; 
    // this.myform.controls['Comment'].setValue(goalData.Comment);
    this.SaveRatingData.Rater = this.SelfRater;
    this.SaveRatingData.Ratee = this.SelfRater;
    this.SaveRatingData.GoalId = goalData.GoalId;
    this.SaveRatingData.GoalType = goalData.GoalType;
    this.SaveRatingData.Rate = this.myform.controls['Rating'].value;
    this.SaveRatingData.Comment = this.myform.controls['Comment'].value;
    return this.SaveRatingData;
  }


  // LOads Rating Goals..
  LoadEmployeeData() {
    debugger;
    this._RatingService.EmployeeData(
    ).subscribe(
      Data => {
        this.EmployeeList = Data;
      });
    }

  ResetForm() {
    this.myform.reset();
  }
}
