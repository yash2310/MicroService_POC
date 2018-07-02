 
 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { AlertService } from 'ngx-alerts';
 
 
 @Injectable()
export class GlobalMehtods {
 
 constructor( private alertService :AlertService , private router:Router ){}
 public expireToken(){
   // this.alertService.danger('User session expired');
   alert('User session expired');
    localStorage.removeItem("userResponse");
    localStorage.clear();
    this.router.navigate(['login']);    
}
}