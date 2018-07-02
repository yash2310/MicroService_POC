import { Component, OnInit } from '@angular/core';
import { RatingService, ReporteeService } from '../Services/index'
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DialogRef } from 'angular2-modal/src/models/dialog-ref';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionExpireDialogComponent } from '../session-expire-dialog/session-expire-dialog.component';
import { Http } from '@angular/http';

@Component({
  selector: 'app-employee-rating',
  templateUrl: './employee-rating.component.html',
  styleUrls: ['./employee-rating.component.css']
})
export class EmployeeRatingComponent implements OnInit{
  RateData : any;
  dataSource: any;
  MatDialogRef: any;
  data: any;
  Rater:any;
  Ratee :any;
  Cycle:any;
   arr:string;
   reportee:any;
   reviewee: any;
  RevieweedataSource :any;
  EmployeedataSource :any;
  EmpId:any;
  UserRole :any;
  employee:any;
  Designation:any;
  user :any;


  displayedColumns = ['Name', 'EmpNO', 'Designation', 'EmailId', 'select'];
  Columns = ['Name', 'EmpNO', 'Designation', 'EmailId', 'select'];
  EmployeeColumns = ['Name', 'EmpNO', 'Designation', 'EmailId', 'select'];

  constructor(private _RatingService : RatingService, private alertService: AlertService, private router: Router,
    public dialog: MatDialog, private  _ReporteeService: ReporteeService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userResponse')).Roles[0].Name;
    if( this.user == 'Employee'){
      this.router.navigate(['user/master']);
    }

    this.EmpId=JSON.parse(localStorage.getItem('userResponse')).EmployeeId;
    this.UserRole=JSON.parse(localStorage.getItem('userResponse')).Roles;
    let roleName: string[];
    for (let i = 0; i < this.UserRole.length; i++) {
      let currentRole= this.UserRole[i].Name;
      if( currentRole== 'HR'|| currentRole== 'Leadership Team' || currentRole== 'Super Admin'){
        this.arr = this.UserRole[i].Name;
      break;
      }
      else{
        this.arr = this.UserRole[i].Name;
      }
    }
    this._ReporteeService.ReporteeRevieweeDataList( this.EmpId,this.arr)
      .subscribe(
      data => {
        this.reportee = data.Reportee;
        this.reviewee = data.Reviewee;
        this.employee = data.Employee;
        this.dataSource = new MatTableDataSource(this.reportee);
        this.RevieweedataSource = new MatTableDataSource(this.reviewee);
        this.EmployeedataSource = new MatTableDataSource(this.employee);
      },
      error => {
        if (error.status == 401) {
          let MatDialogRef = this.dialog.open(SessionExpireDialogComponent);
        }
      }
      );
  }

  applyReporteeFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyRevieweeFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.RevieweedataSource.filter = filterValue;
  }

  applyEmployeeFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.EmployeedataSource.filter = filterValue;
  }

   // For Encryption
   Rate(Name, EmailId,ReporteeId,DesignationId,UserType) {
    let value = btoa(Name + ':' + EmailId + ':'+ ReporteeId + ':' + DesignationId + ':' + UserType); //Encryption
    this.router.navigate(['user/ratings'], { queryParams: { data: value } }); //encrypted parameters in URL
  }

  ReviewRate(Name, EmailId, RevieweeId,DesignationId,UserType) {
    let value = btoa(Name+':' + EmailId+ ':'+ RevieweeId + ':' + DesignationId + ':' + UserType); //Encryption
    this.router.navigate(['user/ratings'], { queryParams: { data: value } }); //encrypted parameters in URL
  }

  EmployeeRate(Name, EmailId, RevieweeId,DesignationId,UserType) {
    let value = btoa(Name+':' + EmailId+ ':'+ RevieweeId + ':' + DesignationId + ':' + UserType); //Encryption
    this.router.navigate(['user/ratings'], { queryParams: { data: value } }); //encrypted parameters in URL
  }


}

