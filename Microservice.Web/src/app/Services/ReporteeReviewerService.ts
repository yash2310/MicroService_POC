import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { debug } from 'util';
import { Router } from '@angular/router';

@Injectable()

export class ReporteeReviewerService {
    authorize: any;
    constructor(private _http: Http,private router: Router) {
        if(localStorage.getItem('userResponse') != null)
            this.authorize = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userResponse')).token });
            else
            this.router.navigate(['login']);
    }

    ReporteeReviewerData(EmpData) {
        return this._http.get('http://localhost:65070/api/Employees/employees/' + EmpData + '/reviewers', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    CreateEmpGoalData(FormData) {
        return this._http.post('http://localhost:65070/api/employee/goals/add', FormData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    CreateManagerialData(FormData) {
        return this._http.post('http://localhost:65070/api/manager/goals/add', FormData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    EmployeeGoalsData(EmpId) {
        return this._http.get('http://localhost:65070/api/Employees/employees/' + EmpId + '/goals', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    checkEmpGoalWeitage(EmpId) {
        return this._http.get('http://localhost:65070/api/employee/goals/employee/' + EmpId + '/weightage', { headers: this.authorize })
            .map((response: Response) => {
                localStorage.removeItem('addEmpGoalWeight');
                localStorage.setItem('addEmpGoalWeight', JSON.stringify(response.json()));
                return response.json();
            });
    }

    checkManagerGoalWeitage(EmpId) {
        return this._http.get('http://localhost:65070/api/manager/goals/manager/' + EmpId + '/weightage', { headers: this.authorize })
            .map((response: Response) => {
                localStorage.removeItem('addManagerGoalWeight');
                localStorage.setItem('addManagerGoalWeight', JSON.stringify(response.json()));
                return response.json();
            });
    }

    DeleteEmpGoal(EmpData) {
        return this._http.post('http://localhost:65070/api/employee/goals/remove', EmpData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    DeleteManagerGoal(MgrData) {
        return this._http.post('http://localhost:65070/api/manager/goals/remove', MgrData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    UpdateEmployeeGoals(EmpData) {
        return this._http.put('http://localhost:65070/api/employee/goals/update', EmpData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    UpdateManagerialGoals(MgrData) {
        return this._http.put('http://localhost:65070/api/manager/goals/update', MgrData, { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
    }

    FinalizeEmpGoals(email) {
        return this._http.get('http://localhost:65070/api/employee/goals/'+email+'/finalizegoal', { headers: this.authorize })
            .map((response: Response) => {
                return response.json();
            });
        }


        FinalizeMgrGoals(email) {
            return this._http.get('http://localhost:65070/api/manager/goals/'+email+'/finalizegoal', { headers: this.authorize })
                .map((response: Response) => {
                    return response.json();
                });
            }
}