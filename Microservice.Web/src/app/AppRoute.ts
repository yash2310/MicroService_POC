
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MasterPageComponent } from './master-page/master-page.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReporteeComponent } from './reportee/reportee.component';
import { ReporteeGoalComponent } from './reportee-goal/reportee-goal.component';
import { RatingDetailsComponent } from './rating-details/rating-details.Component';
import { ManagerRatingComponent } from './manager-rating/manager-rating.component';
import { EmployeeRatingComponent } from './employee-rating/employee-rating.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { ViewReporteeAllRatingComponent } from './view-reportee-all-rating/view-reportee-all-rating.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'login', component: HomeComponent
    },
    { path: 'reset', component: ResetPasswordComponent },
    {
      path: 'user',
      children: [
        { path: 'master', component: MasterPageComponent },
        { path: 'reportee', component: ReporteeComponent },
        { path: 'reporteegoal', component: ReporteeGoalComponent },
        { path: 'ratings', component: RatingDetailsComponent },
        { path: 'managerrating', component: ManagerRatingComponent },
        { path: 'employeerating', component: EmployeeRatingComponent},
        { path: 'viewrating', component:  ViewReporteeAllRatingComponent},
        { path: '', component: PageHeaderComponent, outlet: 'header' },
      ]
    },

    { path: '**', redirectTo: 'login' }
  ], { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoute { }

