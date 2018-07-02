import { Component, OnInit } from '@angular/core';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators ,NgModel} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ServicesService, RatingService } from '../Services/index';
import { Router } from '@angular/router';
import { RatingModel } from '../model/RatingModel';

@Component({
  selector: 'app-manager-rating',
  templateUrl: './manager-rating.component.html',
  styleUrls: ['./manager-rating.component.css']
})
export class ManagerRatingComponent implements OnInit {
  ManagerName: any;
  Rater: any;
  Ratee: any;
  Id: any;
  Cycle: any;
  RateData: any;
  ManagerialGoal: any;
  Design: any;
  myform: FormGroup;
  Mshow:any;
  FormData:any;
  SelfRater : any;
  Designation:any;
  Organization:any;
  message: any;
  rt: number = 0;
  ct: string = '';
  Show: number = 0;
  mergedArray: any;
  user:any;

  SaveRatingData: RatingModel; //Rating data modal required to insert..
  constructor(public _dialog: MatDialog, private router: Router, private _RatingService: RatingService) {

    this.myform = new FormGroup({
      Comment: new FormControl('',[Validators.required,Validators.minLength(8)]),
      Rating: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.max(5),Validators.pattern('^(?:[0-5]|[0-5].[0-9]|0[0-5]|1)$')]))//'[0-5]+(?:\.[0-9]{0,1})?')]))   // ^(?:5(?:\.0)?|[1-6](?:\.[0-9])?|0?\.[1-9])$ 
    });
  }
  

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userResponse')).Roles[0].Name;
    if( this.user !='Employee'){
      this.router.navigate(['user/master']);
    }

    this.ManagerName = JSON.parse(localStorage.getItem('userResponse')).ReportingManager.Name;
    this.Rater = JSON.parse(localStorage.getItem('userResponse')).EmployeeId;
    this.Cycle = JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Id;
   this.Ratee = JSON.parse(localStorage.getItem('userResponse')).ReportingManager.Id;
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
                this.ct = '';
                this.rt = 0;
                
              }
              else {
                this.LoadRatingGoals();
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
                this.rt = 0;
                this.ct = '';
                this.message='';
              }
              else {
                this.LoadRatingGoals();
              }
            });
        }
      }
      else 
      {
        this.message ='* Please enter valid inputs';
        //this.myform.reset();
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
          this.SaveRatingData.TypeId = JSON.parse(localStorage.getItem('userResponse')).Designation.Id; // Designation Id(2)
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
    
     

      // Loads Rating Goals..
      LoadRatingGoals() {
       this.RateData = {
        "Rater": this.Rater,
        "Ratee": this.Ratee,
        "Designation": 0,
        "Organization": 0,
        "Cycle": this.Cycle
      }
      this._RatingService.ManagerRatingData(
        this.RateData
      ).subscribe(
        Data => {
          this.ManagerialGoal = Data;
          this.mergedArray =this.ManagerialGoal;

        
        });  
}

ResetForm(){
  this.myform.reset();
}

// EditFormData(RatingGoal){
//   this.Mshow = RatingGoal.Id + RatingGoal.Goal;
//   this.myform.controls['Rating'].setValue(RatingGoal.Rating) ; 
//   this.myform.controls['Comment'].setValue(RatingGoal.Comment);
// }

}
