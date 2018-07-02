import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { NgForm, NgControl, FormBuilder, FormGroup, FormControl, Validators, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { RatingService } from '../Services/index';
import { ActivatedRoute, Params } from '@angular/router';
import { RatingModel } from '../model/RatingModel';
import { Route } from '@angular/router/src/config';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReporteeService, GlobalMehtods } from '../Services/index';

@Component({
  selector: 'app-view-ratings',
  templateUrl: './view-ratings.component.html',
  styleUrls: ['./view-ratings.component.css']
})
export class ViewRatingsComponent implements OnInit {
GoalId : any;
GoalType : any;
Rater : any;
Ratee : any;
empId : any;
RateDetails : any;
Comment : string;
Rating : Number;
reportee: any;
  
  constructor(
    public dialogRef: MatDialogRef< ViewRatingsComponent >,private _RatingService: RatingService, private activatedRoute: ActivatedRoute, private router: Router,private _ReporteeService: ReporteeService)
  { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let decryptedValue = atob(this.activatedRoute.snapshot.queryParams['data']);
      let data = decryptedValue.split(":");
      if (data == null)
        this.router.navigate(['user', 'employeerating']);
      this.GoalId = data[0];
      this.GoalType = data[1];
      this.empId = data[2];
      
    });

    //this.Rater = JSON.parse(localStorage.getItem('userResponse')).EmployeeId;
     this.Ratee = this.empId;
    this.LoadSelfRatingDetails();
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  LoadSelfRatingDetails(){
    this.RateDetails = {
      "Rater": this.Ratee,
     "Ratee": this.Ratee, // For self rating details..
     "GoalId": this.GoalId,
     "GoalType": this.GoalType
    }
    // this._RatingService.ViewRatingDetails(
    //   this.RateDetails
    // ).subscribe(
    //   Data => {
    //     this.Comment = Data.Comment;
    //     this.Rating = Data.Rating;
    //   });

      
  }
}

