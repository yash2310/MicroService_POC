import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-session-expire-dialog',
  templateUrl: './session-expire-dialog.component.html',
  styleUrls: ['./session-expire-dialog.component.css']
})
export class SessionExpireDialogComponent implements OnInit {

  constructor( private router:Router,
        public dialogRef: MatDialogRef<SessionExpireDialogComponent>
      ){}
    
      onNoClick(): void {
        this.dialogRef.close();
      }

  ngOnInit() {
  }
  Ok()
{
  localStorage.removeItem('userResponse'); // Remove the autosave
  localStorage.clear(); // Clear all data
  this.router.navigate(['login']);

}
}
