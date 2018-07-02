import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingService } from '../Services/index';
import { ActivatedRoute, Params } from '@angular/router';
import { RatingModel } from '../model/RatingModel';
import { Route } from '@angular/router/src/config';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewRatingsComponent } from '../view-ratings/view-ratings.component';

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
  SaveRatingData: RatingModel;
  reporteeId: any;
  Dshow: any;
  Eshow: any = false;
  Oshow: any = false;
  empId: any; // can be of reportee / reviewee..
  rt: number = 0;
  ct: string = '';
  Show: number = 0;
  mergedArray: any;
  message : any;
  DesignationId: any;
  UserType:any;
  user:any;

  constructor(private _RatingService: RatingService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) {

    this.myform = new FormGroup({
      Comment: new FormControl('', [Validators.required,Validators.minLength(8)]),
      Rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5),Validators.pattern('^(?:[0-5]|[0-5].[0-9]|0[0-5]|1)$')])//'[0-5]+(?:\.[0-9]{0,1})?')]))   // ^(?:5(?:\.0)?|[1-6](?:\.[0-9])?|0?\.[1-9])$ 
    });
  }
  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('userResponse')).Roles[0].Name;
    if( this.user == 'Employee'){
      this.router.navigate(['user/master']);
    }

    //Decryption for Name/Email/Role
    this.activatedRoute.params.subscribe((params: Params) => {
      let decryptedValue = atob(this.activatedRoute.snapshot.queryParams['data']);
      let data = decryptedValue.split(":");
      if (data == null)
        this.router.navigate(['user', 'employeerating']);
      this.email = data[0];
      this.name = data[1];
      this.empId = data[2];
      this.DesignationId = data[3];
      this.UserType = data[4];
    });

    this.Rater = JSON.parse(localStorage.getItem('userResponse')).EmployeeId;
    this.Ratee = this.empId;
   // this.Designation = JSON.parse(localStorage.getItem('userResponse')).Designation.Id;
    this.Organization = JSON.parse(localStorage.getItem('userResponse')).Organization.Id;
    this.Cycle = JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id;

    this.LoadRatingGoals();

  }

  SubmitRatings(goalData) {
    // To Insert Managerial Ratings..
    if ((this.myform.controls["Rating"].valid) && (this.myform.controls["Comment"].valid)) {
    if (goalData.Id == 0) {
      this.FormData = this.FillRatingModel(goalData);
      this._RatingService.RatingAddData(
        this.FormData
      ).subscribe(
        Data => {
          if (Data == 'Success') {
            this.LoadRatingGoals();
            this.myform.reset();
            this.rt = 0;
            this.ct = '';
          }
          else {
            this.LoadRatingGoals();
            this.myform.reset();
          }
        });
    }
    // TO UPdate Managerial Ratings
    else if (goalData.Id >= 0) {
      this.FormData = this.FillRatingModel(goalData);
      this._RatingService.UpdateRatingData(
        this.FormData
      ).subscribe(
        Data => {
          if (Data == 'Success') {
            this.LoadRatingGoals();
            this.myform.reset();
            this.rt = 0;
            this.ct = '';
            this.message ='';
          }
          else {
            this.LoadRatingGoals();
            this.myform.reset();
          }
        });
    }
  
    }
    else {
      this.message = "* Please enter valid inputs";
      this.myform.reset();
      this.LoadRatingGoals();
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
      this.SaveRatingData.TypeId = this.DesignationId; // Designation Id(2)
    }
    else if (goalData.GoalType == 1) {
      this.SaveRatingData.TypeId = JSON.parse(localStorage.getItem('userResponse')).Organization.Id; // Organization Id(1)
    }

    this.SaveRatingData.Rater = this.Rater;
    this.SaveRatingData.Ratee = this.Ratee;
    this.SaveRatingData.GoalId = goalData.GoalId;
    this.SaveRatingData.GoalType = goalData.GoalType;
    this.SaveRatingData.Rate = this.myform.controls['Rating'].value;
    this.SaveRatingData.Comment = this.myform.controls['Comment'].value;
    return this.SaveRatingData;
  }


  // LOads Rating Goals..
  LoadRatingGoals() {
    this.RateData = {
      "Rater": this.Rater,
      "Ratee": this.Ratee,
      "Designation": this.DesignationId,
      "Organization": this.Organization,
      "Cycle": this.Cycle,
      "UserType":this.UserType
    }
    this._RatingService.SelfRatingLoadData(
      this.RateData
    ).subscribe(
      Data => {

        this.OrganizationGoal = Data.OrganizationGoalsRating;
        this.EmployeeGoal = Data.EmployeeGoalsRating;
        this.DesignationGoal = Data.DesignationGoalsRating;
         if(this.UserType == 'Employee')

             {
              this.mergedArray = this.OrganizationGoal;
             }

            else  if(this.UserType == 'Reportee')

             {
              this.mergedArray = this.mergedArray = this.EmployeeGoal.concat(this.DesignationGoal);
             }
               else {
                 if(this.UserType == 'Reviewee')
                 {
                  this.mergedArray = this.EmployeeGoal;
                 }
               }
    
      });
  }

  ResetForm() {
    this.myform.reset();
  }

  EditFormData(RatingGoal) {
    this.Oshow = RatingGoal.GoalId;
  }
  //   EditDsnFormData(RatingGoal) {
  //     this.Dshow=RatingGoal.GoalId;
  //  }
  //  EditEmpFormData(EmpGoal) {
  //   this.Eshow=EmpGoal.GoalId;
  // }

  openDialog(GoalId, GoalType): void {
    let value = btoa(GoalId + ':' + GoalType + ':' + this.empId); //Encryption
    this.router.navigate(['user/ratings'], { queryParams: { data: value } }); //encrypted parameters in URL
    let dialogRef = this.dialog.open(ViewRatingsComponent, {
      // width: '250px',
    });

  }
}