import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { debug } from 'util';
import { Router } from '@angular/router';

@Injectable()

export class RatingService {
    authorize: any;
    constructor(private _http: Http,private router: Router) {
        if(localStorage.getItem('userResponse') != null)
            this.authorize = new Headers({ 'Authorization': 'Basic ' + JSON.parse(localStorage.getItem('userResponse')).token });
            else
            this.router.navigate(['login']);
    }


    //Get all Employees
    EmployeeData() {
        return this._http.get('http://localhost:9093/api/employee/list', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    //Get Employees Department wise
    EmployeeDataByDeptId(DeptId) {
        debugger;
        return this._http.get('http://localhost:62252/api/department/employee/list?departmentId='+DeptId, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    //Get All departments
    DepartmentData() {
        return this._http.get('http://localhost:62252/api/department/list', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }
    
    //Employee Final Rating By Employee Id
    FinalRatingLoadData(EmployeeNo,UserRole) {
        return this._http.get('http://localhost:65070/api/ratings/employee/' + EmployeeNo + '/'+ UserRole + '/finalrating', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }
    ReporteeReviewerData(EmpData) {
        return this._http.get('http://localhost:65070/api/Employees/employees/' + EmpData + '/reviewers', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }
    

    UpdateRatingData(RateData) {
        return this._http.post('http://localhost:65070/api/ratings/update', RateData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    RatingAddData(RateData) {
        return this._http.post('http://localhost:65070/api/ratings/add', RateData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    ManagerRatingData(RateData) {

        return this._http.post('http://localhost:65070/api/ratings/manager', RateData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    RevieweeRatingData(RateData) {
        return this._http.post('http://localhost:65070/api/ratings/employee', RateData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    //All Goal Details by Employee Id 
    AllRatingLoadData(RateData) {
        return this._http.get('http://localhost:65070/api/ratings/employee/' + RateData +'/ratings', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }


}