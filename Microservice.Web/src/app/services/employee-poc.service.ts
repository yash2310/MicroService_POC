import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class EmployeePocService {

  authorize: any;
  constructor(private _http: Http, private router: Router) {
    if (localStorage.getItem('userResponse') != null)
      this.authorize = new Headers({ 'Authorization': 'Basic ' + JSON.parse(localStorage.getItem('userResponse')).Access_Token });
    else
      this.router.navigate(['login']);
  }

  EmployeeData() {
    return this._http.get('http://employeeservicepoc.azurewebsites.net/api/employee/list', { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }

  DepartmentData() {
    return this._http.get('http://departmentservicepoc.azurewebsites.net/api/department/list', { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }

  AddEmployee(empData) {
    return this._http.post('http://employeeservicepoc.azurewebsites.net/api/employee/add', empData, { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }

  UpdateEmployee(empData) {
    return this._http.post('http://employeeservicepoc.azurewebsites.net/api/employee/update', empData, { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }

  DeleteEmployee(empId) {
    return this._http.get('http://employeeservicepoc.azurewebsites.net/api/employee/remove?id=' + empId, { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }

  //Get Employees Department wise
  EmployeeDataByDeptId(DeptId) {
    return this._http.get('http://departmentservicepoc.azurewebsites.net/api/department/employee/list?departmentId=' + DeptId, { headers: this.authorize })
      .map((response: Response) => {
        return response.json();
      });
  }
}
