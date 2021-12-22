import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

  login() {
    this.dialogRef.close()
  }
}
