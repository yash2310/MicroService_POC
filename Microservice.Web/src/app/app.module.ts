import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoute } from './AppRoute';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';
import { ModalModule } from 'angular2-modal';
import { ServicesService, ReporteeService, ReporteeReviewerService, GlobalMehtods, RatingService } from './Services/index';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertModule } from 'ngx-alerts';
import { ReporteeComponent } from './reportee/reportee.component';
import { ReporteeGoalComponent } from './reportee-goal/reportee-goal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import {PasswordValidators} from 'ng2-validators';
import { PasswordMatchService } from './Services/index';
import { appMessagesComponent } from '../app/appErrorMsg';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { CompareValidatorModule } from 'angular-compare-validator';
import { ModalComponent } from './modal/modal.component';
import { SessionExpireDialogComponent } from './session-expire-dialog/session-expire-dialog.component';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
//import{RatingDetailsComponent} from './ RatingDetailsComponent';
import { RatingDetailsComponent } from './rating-details/rating-details.Component';
import { ManagerRatingComponent } from './manager-rating/manager-rating.component';
import { EmployeeRatingComponent } from './employee-rating/employee-rating.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { ViewReporteeAllRatingComponent } from './view-reportee-all-rating/view-reportee-all-rating.component';
import { EmployeePocService } from './Services/employee-poc.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MasterPageComponent,
    PageHeaderComponent,
    ResetPasswordComponent,
    ReporteeComponent,
    ReporteeGoalComponent,
    ModalComponent,
    SessionExpireDialogComponent,
    appMessagesComponent,
    RatingDetailsComponent,
    ManagerRatingComponent,
    EmployeeRatingComponent,
    ViewRatingsComponent,
    ViewReporteeAllRatingComponent
  ],
  imports:
    [
      BrowserAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatDialogModule,
      AppRoute,
      HttpModule,
      RouterModule,
      ModalModule.forRoot(),
      AlertModule.forRoot({ maxMessages: 3, timeout: 5000 }),
      MatAutocompleteModule,
      MatMenuModule,
      MatTableModule,
      NgSelectModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      CompareValidatorModule,
      JasperoConfirmationsModule,
      MultiselectDropdownModule
    ],
  entryComponents: [MasterPageComponent, ViewRatingsComponent, SessionExpireDialogComponent],
  providers: [EmployeePocService, ServicesService, PasswordMatchService, ReporteeService, ReporteeReviewerService, GlobalMehtods, ViewRatingsComponent, SessionExpireDialogComponent, RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
