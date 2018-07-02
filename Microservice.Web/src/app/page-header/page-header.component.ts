import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';
import { ServicesService } from '../Services/index';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  host: {
    "(document:click)": "onClick($event)"
  }
})
export class PageHeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  UserName: any;
  ReviewCycle: any;
  NewUser: any;
  UserRole: any;
  GoalFlag: any;
  RateFlag: any;
  ReviewFlag: any;



  constructor(private router: Router, private FlagService: ServicesService) { }

  ngOnInit() {
    if (localStorage.getItem('userResponse') === null) {
      this.router.navigate(['login']);

    }
    else {
      this.UserName = JSON.parse(localStorage.getItem('userResponse')).Name;
      this.ReviewCycle = JSON.parse(localStorage.getItem('userResponse')).ReviewCycle.Name + ", " + (new Date()).getFullYear();
      this.NewUser = JSON.parse(localStorage.getItem('userResponse')).NewUser;
      this.UserRole = JSON.parse(localStorage.getItem('userResponse')).Roles[0].Name;
      if (this.NewUser == true) //boolean Value
      {
        this.router.navigate(['reset']);
      }
    }

    this.FlagService.FlagForRatingAndGoal().subscribe(
      data => {
        this.GoalFlag = data.Goal;
        this.RateFlag = data.Rate;
        this.ReviewFlag = data.Review;
      });

  }

  logout() {
    localStorage.removeItem('userResponse'); // Remove the autosave
    localStorage.removeItem('GoalFlagResponse');
    localStorage.clear(); // Clear all data
    this.router.navigate(['login']);
  }

  //#region Close Logout

  public onClick(event) {
    if (event.target.className.includes("logout")) {
    }
    else {
      this.trigger.closeMenu();
    }
  }

  //#endregion
}
