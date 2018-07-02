import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { debug } from 'util';
import { ActivatedRoute, Params } from '@angular/router';
import { ReporteeReviewerService } from '../Services/index'
import { Router } from '@angular/router';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { Title } from '@angular/platform-browser/src/browser/title';
import { GlobalMehtods } from '../Services/index';
import { SessionExpireDialogComponent } from '../session-expire-dialog/session-expire-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { MatSelectModule, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-reportee-goal',
  templateUrl: './reportee-goal.component.html',
  styleUrls: ['./reportee-goal.component.css'],
  host: {
    "(document:click)": "onClick($event)"
  }
})

export class ReporteeGoalComponent implements OnInit {
  //#region Variables
  myform: FormGroup;
  EmailData: any;
  reviewer: any
  toppingList: any[];
  EmailId: any;
  Type: any;
  Id: any;
  Title: any;
  StartDate: any;
  EndDate: any;
  ReviewerList: any = [];
  Description: any;
  Weightage: any;
  FormData: any;
  ReviewCycle: any;
  EmpGoal: any;
  EmployeeGoal: any;
  OrganizationGoal: any;
  DesignationGoal: any;
  ManagerialGoal: any;
  email: any;
  name: any;
  Message: any;
  title: any;
  role: any;
  showDetails: boolean = false;
  DeleteConfirm: boolean = false;
  editWeight: number;
  MgrFormData: any;
  FinalDataRes: any;
  DelMsg: any;
  reporteeId: any;
  //Goal Status Variable
  empGoalStatus: number;
  mgrGoalStatus: number;
  //Goals Total Weight
  empTotalWeight: number;
  mgrTotalWeight: number;
  minDate: any;
  //Date Check
  min = new Date();
  lastDateChange = new Date();
  maxDate: Date;
  mydate = new Date;
  finalcheck: boolean = false;
  finalMgrcheck: boolean = false;
  selectedReviewer: any[];

  //#endregion

  @ViewChild('rvselect') rvselect;
  @ViewChild('startDate') startDate;
  @ViewChild('endDate') endDate;

  GoalFlag: any;
  constructor(private _ReporteeReviewerService: ReporteeReviewerService, private router: Router,
    private activatedRoute: ActivatedRoute, private _GlobalMehtods: GlobalMehtods, public dialog: MatDialog
    , private _confirmation: ConfirmationService) {

    this.myform = new FormGroup({
      GoalId: new FormControl(''),
      GoalTitle: new FormControl('', Validators.required),
      GoalType: new FormControl(),
      StartDate: new FormControl('', Validators.required),
      EndDate: new FormControl('', Validators.required),
      ReviewerSelecter: new FormControl('', Validators.required),
      GoalDescpt: new FormControl('', Validators.required),
      GoalWt: new FormControl('', Validators.compose([Validators.required, , Validators.min(0), Validators.max(100),Validators.pattern('^[1-9]?[0-9]{1}$|^100')]))
    });  //Validation 0 to 4.9


    this.mgrGoalStatus = 0;
    this.empGoalStatus = 0;

    this.mgrTotalWeight = 0;
    this.empTotalWeight = 0;
  }

  toppings = new FormControl();

  //Page Loads Starts Here
  ngOnInit() {
    this.myform.controls['GoalType'].setValue("Employee");
    this.showDetails = false;
    //Decryption for Name/Email/Role
    this.activatedRoute.params.subscribe((params: Params) => {
      let decryptedValue = atob(this.activatedRoute.snapshot.queryParams['data']);
      let data = decryptedValue.split(":");
      if (data == null)
        this.router.navigate(['user', 'reportee']);
      this.email = data[0];
      this.name = data[1];


      if (data[2].includes("Super Admin")) {
        this.role = "Super Admin";
      }
      else if (data[2].includes("Leadership Team")) {
        this.role = "Leadership Team";
      }
      else if (data[2].includes("Manager")) {
        this.role = "Manager";
      }
      else if (data[2].includes("Employee")) {
        this.role = "Employee";
      }

      this.reporteeId = data[3];
    });

    if (this.email !== null || this.name !== null) {
      // Service To Get Reviewers
      this._ReporteeReviewerService.ReporteeReviewerData(this.reporteeId)
        .subscribe(
        data => {
          this.toppingList = data;
          this.LoadGoalData();
        });
    }

  }

  // Submit Create/Edit Goals
  OnSubmit() {
    if(this.myform.valid){
    this.Id = this.myform.controls['GoalId'].value;
    this.Title = this.myform.controls['GoalTitle'].value;
    this.Type = this.myform.controls['GoalType'].value;
    this.StartDate = this.myform.controls['StartDate'].value;
    this.EndDate = this.myform.controls['EndDate'].value;
    if (this.Type == "Employee") {
      let reviewerList = this.myform.controls['ReviewerSelecter'].value;
        let data = [];

        if (reviewerList != null) {
          this.ReviewerList = null;
          for (let i = 0; i < reviewerList.length; i++) {
            this.toppingList.forEach(element => {
              if (element.Id == reviewerList[i]) {
                data[i] = element;
              }
            })
          }

          this.ReviewerList = data;

          this.ReviewerList[this.ReviewerList.length] = {
            Id: Number(this.reporteeId),
            Name: this.name,
            EmailId: this.email,
            EmployeeNo: ""
          };
        }
      }

    this.Description = this.myform.controls['GoalDescpt'].value;
    this.Weightage = this.myform.controls['GoalWt'].value;

    this.FormData = {
      "Id": this.Id,
      "Title": this.Title,
      "Type": this.Type,
      "StartDate": this.StartDate,
      "EndDate": this.EndDate,
      "ReviewerList": this.ReviewerList,
      "EmployeeEmail": this.email,
      "ReviewCycle": JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id,
      "Description": this.Description,
      "Weightage": this.Weightage,
    }

    this.MgrFormData = {
      "Id": this.Id,
      "Title": this.Title,
      "Type": this.Type,
      "StartDate": this.StartDate,
      "EndDate": this.EndDate,
      "EmployeeEmail": this.email,
      "ReviewCycle": JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id,
      "Description": this.Description,
      "Weightage": this.Weightage,
    }
    // Update Existing Goal
    if (this.Id != "" && this.Type == 'Managerial') {

      this._ReporteeReviewerService.checkManagerGoalWeitage(    //check for MgrWeight service
        this.reporteeId
      ).subscribe(
        Data => {

          let weight = localStorage.getItem('addManagerGoalWeight');

          if ((Number(this.Weightage) + (Number(weight) - this.editWeight)) > 100) {
            this.Message = "Total weightage must be less than 100";
            return false;
          }
          else {
            this._ReporteeReviewerService.UpdateManagerialGoals(     //UpdateMgr service
              this.MgrFormData
            ).subscribe(
              Data => {
                if (Data == true) {
                  this.ResetFormData();
                  this.LoadGoalData();

                  this.Message = "Record updated successfully";
                } else {
                  this.Message = "Please try again";
                }
              },

            );
          }
        });
    }
    else if (this.Id != "" && this.Type == 'Employee') {
      this._ReporteeReviewerService.checkEmpGoalWeitage(         // Check for Managerial Goals
        this.reporteeId
      ).subscribe(
        Data => {

          let weight = localStorage.getItem('addEmpGoalWeight');
          if ((Number(this.Weightage) + (Number(weight) - this.editWeight)) > 100) {
            this.Message = "Total weightage must be less than 100";
            return false;
          }
          else {
            this._ReporteeReviewerService.UpdateEmployeeGoals(      //For Employee goals
              this.FormData
            ).subscribe(
              Data => {
                if (Data == true) {
                  this.ResetFormData();
                  this.LoadGoalData();

                  this.Message = "Record updated successfully";
                } else {
                  this.Message = "Please try again";
                }
              },
            );
          }
        }
        );
    }
    // Adding New Goal
    else if (this.Id == "" && this.Type == 'Managerial') {

      this._ReporteeReviewerService.checkManagerGoalWeitage(
        this.reporteeId
      ).subscribe(
        Data => {
          let weight = localStorage.getItem('addManagerGoalWeight');

          if ((Number(this.Weightage) + Number(weight)) > 100) {
            this.Message = "Total weightage must be less than 100";
            return false;
          }
          else {
            this._ReporteeReviewerService.CreateManagerialData(
              this.MgrFormData
            ).subscribe(
              Data => {
                if (Data == true) {
                  this.ResetFormData();
                  this.LoadGoalData();

                  this.Message = "Record added sucessfully";
                } else {
                  this.Message = "Please try again";
                }
              },
              error => {
                if (error.status == 400 && error._body == 'Invalid Goal')
                  this.Message = "Goal Already Exists";

              });
          }
        });
    }
    else if (this.Id == "" && this.Type == 'Employee') {
      // if(this.EmployeeGoal.length>0){
      //   = this.myform.controls['GoalTitle'].value;
      //   for (let goal of this.EmployeeGoal){

      //   }
      // }
      this._ReporteeReviewerService.checkEmpGoalWeitage(
        this.reporteeId
      ).subscribe(
        Data => {
          let weight = localStorage.getItem('addEmpGoalWeight');

          if ((Number(this.Weightage) + Number(weight)) > 100) {
            this.Message = "Total weightage must be less than 100";
            return false;
          }
          else {
            this._ReporteeReviewerService.CreateEmpGoalData(
              this.FormData
            ).subscribe(
              Data => {
                if (Data == true) {
                  this.LoadGoalData();
                  this.ResetFormData();

                  this.Message = "Record added successfully";
                }
                else {
                  this.Message = "Please try again";
                }
              },
              error => {

                if (error.status == 400 && error._body == 'Invalid Goal')
                  this.Message = "Goal Already Exists";
              });
          }
        }
        );
    }
  }
  }

  // Load All Goals And Reviewers On Page Load
  LoadGoalData() {
    // this.EmailId = JSON.parse(localStorage.getItem('userResponse')).EmailId;
    //Service to get All Goals..

    this._ReporteeReviewerService.EmployeeGoalsData(this.reporteeId).subscribe(
      Data => {
        this.OrganizationGoal = Data.OrganizationGoalList;
        this.EmployeeGoal = Data.EmployeeGoalList;
        this.ManagerialGoal = Data.ManagerialGoalList;
        this.DesignationGoal = Data.DesignationGoalList;

        if (this.EmployeeGoal.length > 0) {
          this.empGoalStatus = this.EmployeeGoal[0].Status;
          this.empTotalWeight = 0;

          this.EmployeeGoal.forEach(element => {
            this.empTotalWeight += element.Weightage;
          });
        }

        if (this.ManagerialGoal.length > 0) {
          this.mgrGoalStatus = this.ManagerialGoal[0].Status;
          this.mgrTotalWeight = 0;

          this.ManagerialGoal.forEach(element => {
            this.mgrTotalWeight += element.Weightage;
          });
        }
      },
      error => {
        if (error.status == 401) {
          let MatDialogRef = this.dialog.open(SessionExpireDialogComponent);
        }
      });
  }

  Edit(empGoal) {
    this.lastDateChange = empGoal.startDate;
    this.showDetails = true;
    this.myform.controls['GoalId'].setValue(empGoal.Id);
    this.myform.controls['GoalTitle'].setValue(empGoal.Title);
    this.myform.controls['GoalType'].setValue(empGoal.Type);
    this.myform.controls['StartDate'].setValue(new Date(empGoal.StartDate));
    this.myform.controls['EndDate'].setValue(new Date(empGoal.EndDate));
    this.myform.controls['ReviewerSelecter'].setValue([empGoal.ReviewerList.Name]);
    this.myform.controls['GoalDescpt'].setValue(empGoal.Description);
    this.myform.controls['GoalWt'].setValue(empGoal.Weightage);
    this.editWeight = empGoal.Weightage;
    //this.lastDateChange = new Date();
    
    let j = 0;
    let arr = [];
    empGoal.ReviewerList.forEach(element => {
      arr[j] = element.Id;
      j++;
    });
    this.selectedReviewer = arr;
  }

  EditMgrGoal(empGoal) {
    this.showDetails = true;
    this.myform.controls['GoalId'].setValue(empGoal.Id);
    this.myform.controls['GoalTitle'].setValue(empGoal.Title);
    this.myform.controls['GoalType'].setValue(empGoal.Type);
    this.myform.controls['StartDate'].setValue(new Date(empGoal.StartDate));
    this.myform.controls['EndDate'].setValue(new Date(empGoal.EndDate));
    this.myform.controls['GoalDescpt'].setValue(empGoal.Description);
    this.myform.controls['GoalWt'].setValue(empGoal.Weightage);
    this.editWeight = empGoal.Weightage;
  }

  // Delete Employee Goals 
  DeleteEmpGoal(empGoal) {
    this.DeleteConfirm = true;
    this.FormData = {
      "Id": empGoal.Id,
      "Title": empGoal.Title,
      "Type": empGoal.Type,
      "StartDate": empGoal.StartDate,
      "EndDate": empGoal.EndDate,
      "ReviewerList": empGoal.ReviewerList,
      "EmployeeEmail": this.email,
      "ReviewCycle": JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id,
      "Description": empGoal.Description,
      "Weightage": empGoal.Weightage,
    }
    this._ReporteeReviewerService.DeleteEmpGoal(this.FormData).subscribe(
      data => {
        if (data == true) {
          this.LoadGoalData();
          this.Message = "Record deleted successfully";
        } else {
          this.Message = "Please try again";
        }
      },
      error => {
        if (error.status == 401) {
        }
      });
  }
  //Delete Managerial Goals
  DeleteMgrGoal(MgrGoal) {
    this.FormData = {
      "Id": MgrGoal.Id,
      "Title": MgrGoal.Title,
      "Type": MgrGoal.Type,
      "StartDate": MgrGoal.StartDate,
      "EndDate": MgrGoal.EndDate,
      "EmployeeEmail": this.email,
      "ReviewCycle": JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id,
      "Description": MgrGoal.Description,
      "Weightage": MgrGoal.Weightage
    }
    this._ReporteeReviewerService.DeleteManagerGoal(this.FormData).subscribe(
      data => {
        if (data == true) {
          this.LoadGoalData();
          this.Message = "Record deleted successfully";
        } else {
          this.Message = "Please try again";
        }
      },
      error => {
        if (error.status == 401) {
        }
      });

  }

  // CLEAR ALL FORM FIELDS AFTER SUBMIT
  ResetFormData() {
    this.showDetails = false;
    this.myform.controls['GoalId'].setValue('');
    this.myform.controls['GoalTitle'].setValue('');
    this.myform.controls['GoalType'].setValue('Employee');
    this.myform.controls['StartDate'].setValue('');
    this.myform.controls['EndDate'].setValue('');
    this.myform.controls['ReviewerSelecter'].setValue(null);
    this.myform.controls['GoalDescpt'].setValue('');
    this.myform.controls['GoalWt'].setValue('');
    this.editWeight = 0;
  }

  // Employee Goals at Submitted Mode..
  FinalizeEmpGoals() {
    this.finalcheck = false;
    this._ReporteeReviewerService.FinalizeEmpGoals(this.reporteeId).subscribe(
      FinalizeEmpData => {
        if (FinalizeEmpData == true) {
          this.ResetFormData();
          this.LoadGoalData();
          this.Message = "Successfully finalized.";
        }
        else {
          this.Message = "Please try again";
        }
      },
      error => {
        if (error.status == 401) {

        }
      });
  }

  // Managerial Goals at Submitted Mode..
  FinalizeMgrGoals() {
    this.finalMgrcheck = false;
    this._ReporteeReviewerService.FinalizeMgrGoals(this.reporteeId).subscribe(
      FinalizeMgrData => {
        if (FinalizeMgrData == true) {
          this.ResetFormData();
          this.LoadGoalData();
          this.Message = "Successfully finalized.";
        }
        else {
          this.Message = "Please try again";
        }
      },
      error => {
        if (error.status == 401) {

        }
      });

  }

  No() {
    this.DeleteConfirm = false;
  }


  onDateChange = (e: MatDatepickerInputEvent<Date>) => this.lastDateChange.setDate(e.value.getDate());

  //#region Close Popups

  public onClick(event) {
    
    if (event.target.className.includes("mat-select") || event.target.className.includes("mat-option") || event.target.className.includes("ng-tns-c4") || this.rvselect == undefined) {
    }
    else {
      this.rvselect.close();
    }
    // if (this.endDate != undefined && this.startDate != undefined) {
    //   this.endDate.close();
    //   this.startDate.close();
    // }
if(!event.target.className.includes("mat-calendar"))
{
      this.endDate.close();
      this.startDate.close();
}
  }

  //#endregion
}






