import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { debug } from 'util';

@Injectable()
export class ServicesService {

    constructor(private _http: Http) { }

    //User Login
    loginadmin(data) {
        debugger;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post('http://localhost:62238/api/security/login', data)
            .map((response: Response) => {
                debugger;
                localStorage.setItem('userResponse', JSON.stringify(response.json()));
                return response.json();
            });
    }

    //Reset Password
    RestPasswordData(data) {
        let head = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userResponse')).token });
        return this._http.post('http://localhost:65070/api/security/reset', data, { headers: head })
            .map((response: Response) => {
                return response.json();
            });
    }

    FlagForRatingAndGoal() {
        return this._http.get('http://localhost:65070/api/security/setting')
            .map((response: Response) => {
                localStorage.setItem('GoalFlagResponse', JSON.stringify(response.json()));
                return response.json();
            });
    }
}