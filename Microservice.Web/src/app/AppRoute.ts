
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MasterPageComponent } from './master-page/master-page.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RouterModule, Routes } from '@angular/router';
import { RatingDetailsComponent } from './rating-details/rating-details.Component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'login', component: HomeComponent
    },
    {
      path: 'user',
      children: [
        { path: 'master', component: MasterPageComponent },
        { path: 'ratings', component: RatingDetailsComponent },
        { path: '', component: PageHeaderComponent, outlet: 'header' },
      ]
    },

    { path: '**', redirectTo: 'login' }
  ], { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoute { }

