import { Component, OnInit } from '@angular/core';
import { ReporteeService, GlobalMehtods } from '../Services/index'
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DialogRef } from 'angular2-modal/src/models/dialog-ref';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionExpireDialogComponent } from '../session-expire-dialog/session-expire-dialog.component';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { ServicesService } from '../Services/AuthenticationServices';


@Component({
  selector: 'app-reportee',
  templateUrl: './reportee.component.html',
  styleUrls: ['./reportee.component.css']
})
export class ReporteeComponent implements OnInit {
  reportee: any;
  EmailId: any;
  EmailData: any;
  dataSource: any;
  MatDialogRef: any;
  data: any;
  user:any;
  GoalFlag : any;
  arr: String[];
  displayedColumns = ['Name', 'EmpNO', 'Designation', 'EmailId', 'GoalsCount', 'GoalStatus', 'select'];

  constructor(private _ReporteeService: ReporteeService, private alertService: AlertService, private router: Router,
    private GlobalMethods: GlobalMehtods, public dialog: MatDialog, private FlagService: ServicesService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userResponse')).Roles[0].Name;
    if( this.user == 'Employee'){
      this.router.navigate(['user/master']);
    }
    this.EmailId = JSON.parse(localStorage.getItem('userResponse')).EmailId;
    this.EmailData = { "EmailId": this.EmailId }
    this._ReporteeService.ReporteeDataList(JSON.parse(localStorage.getItem('userResponse')).EmployeeId)
      .subscribe(
      data => {
        this.reportee = data;
        this.dataSource = new MatTableDataSource(this.reportee);

        this.FlagService.FlagForRatingAndGoal().subscribe(
          data => {
            this.GoalFlag = data.Goal;
          });
      },
      error => {
        if (error.status == 401) {
          let MatDialogRef = this.dialog.open(SessionExpireDialogComponent);
        }
      }
      );
    this.GoalFlag = JSON.parse(localStorage.getItem('GoalFlagResponse')).Goal;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // For Encryption
  AsignGoal(Name, EmailId, Role, ReporteeId) {
    let roleName: string[];
    for (let i = 0; i < Role.length; i++) {
      let currentRole= Role[i].Name;
      if( currentRole== 'Super Admin'|| currentRole== 'Leadership Team'){
        continue;
      }
      else{
      this.arr = Role[i].Name;
      break;
      }
    }
    let value = btoa(Name + ':' + EmailId + ':' + this.arr + ':' + ReporteeId); //Encryption
    this.router.navigate(['user/reporteegoal'], { queryParams: { data: value } }); //encrypted parameters in URL
  }
}
