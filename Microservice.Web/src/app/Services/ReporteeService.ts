import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { debug } from 'util';
import { Router } from '@angular/router';
@Injectable()
export class ReporteeService {

    authorize: any;
    constructor(private _http: Http,private router: Router) {
        if(localStorage.getItem('userResponse') != null)
            this.authorize = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userResponse')).token });
            else
            this.router.navigate(['login']);
    }


    ReporteeRevieweeDataList(EmployeeId, role) {
        return this._http.get('http://localhost:65070/api/reportees/employees/'+ EmployeeId +'/' +role +'/reviewee', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }


    ReporteeDataList(EmployeeId){
        return this._http.get('http://localhost:65070/api/reportees/employees/'+ EmployeeId +'/reportees', { headers: this.authorize })
                .map((response: Response) => {
                    return response.json();
                });
            }

            AllReporteeDataList(EmployeeId){
                return this._http.get('http://localhost:65070/api/reportees/employees/'+ EmployeeId +'/downline', { headers: this.authorize })
                        .map((response: Response) => {
                            return response.json();
                        });
                    }
}