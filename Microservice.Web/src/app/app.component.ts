import { Component, OnInit, HostBinding,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

showLoader: boolean;
showHeader: boolean = true;
title = 'app works!';

  constructor(    
  private router: Router,
  private cdr: ChangeDetectorRef,
  ) { 
}
ngOnInit() {
  // listenging to routing navigation event
  //this.router.events.subscribe(event => this.modifyHeader(event));
  

}

 ngAfterViewInit() {   
  this.cdr.detectChanges();
}
}
  
