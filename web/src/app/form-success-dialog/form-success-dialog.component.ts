import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-success-dialog',
  templateUrl: './form-success-dialog.component.html',
  styleUrls: ['./form-success-dialog.component.scss']
})
export class FormSuccessDialogComponent {

  constructor(private dialogRef: MatDialogRef<FormSuccessDialogComponent>) { }

  close() {
    this.dialogRef.close()
  }
}
