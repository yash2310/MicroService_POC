import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReporteeService, GlobalMehtods } from '../Services/index';
import { ServicesService, RatingService } from '../Services/index';

@Component({
  selector: 'app-view-reportee-all-rating',
  templateUrl: './view-reportee-all-rating.component.html',
  styleUrls: ['./view-reportee-all-rating.component.css']
})
export class ViewReporteeAllRatingComponent implements OnInit {
  myControl: FormControl = new FormControl();
  showGrid: boolean = false;
  Individual: boolean = false;
  Designation: boolean = false;
  Organization: boolean = false;
  name: string;
  reportees: any;
  reporteeList = [];
  reporteeList1 = [];
  ratingData: any;
  OrganizationGoal: any;
  EmployeeGoal: any;
  ManagerialGoal: any;
  DesignationGoal: any;
  mergedArray: any;
  GoalsCount: any;

  constructor(private _ReporteeService: ReporteeService, private _RatingService: RatingService) {
  }
  // options = [
  //   '_Kritika',
  //   '_Simran',
  //   '_Aayush',
  //   '_Manoj'
  // ];


  filteredOptions: Observable<any>;

  ngOnInit() {

    this._ReporteeService.AllReporteeDataList(JSON.parse(localStorage.getItem('userResponse')).EmployeeId)
      .subscribe(
        data => {
          this.reportees = data;
          for (let reportee of this.reportees) {
            this.reporteeList.push(reportee);
          }
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filter(val))
            );
        });
        
    // this._ReporteeService.ReporteeDataList(JSON.parse(localStorage.getItem('userResponse')).EmployeeId)
    //   .subscribe(
    //     data => {
    //       this.reportees = data;
    //       for (let reportee of this.reportees) {
    //         // let map = new Map();
    //         // map.set(reportee.EmployeeNo,reportee.Name);

    //         // this.reporteeList1.push(map);
    //         // this.reporteeList.push(reportee.Name);
    //         this.reporteeList.push(reportee);
    //       }
    //       this.filteredOptions = this.myControl.valueChanges
    //         .pipe(
    //           startWith(''),
    //           map(val => this.filter(val))
    //         );
    //     });
  }

  filter(val: string): string[] {
    return this.reporteeList.filter(reportee =>
      reportee.Name.toLowerCase().includes(val.toLowerCase()));
  }

  OnChange(reportee) {
    this._RatingService.AllRatingLoadData(reportee)
      .subscribe(
        Data => {
          this.OrganizationGoal = Data.OrganizationGoalsRating;
          this.EmployeeGoal = Data.EmployeeGoalsRating;
          this.DesignationGoal = Data.DesignationGoalsRating;
          this.ManagerialGoal = Data.ManagerGoalsRating;
          this.GoalsCount = 0;
          this.GoalsCount = this.OrganizationGoal == null ? 0 : this.OrganizationGoal.length + this.EmployeeGoal == null ? 0 : this.EmployeeGoal.length + this.DesignationGoal == null ? 0 : this.DesignationGoal.length ;
          this.mergedArray = this.EmployeeGoal.concat(this.DesignationGoal).concat(this.OrganizationGoal).concat(this.ManagerialGoal);
        });

    this.showGrid = true;
  }
}
