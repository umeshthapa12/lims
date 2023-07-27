import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";



@Component({
    templateUrl:'./admin-view-sample.html',
    styleUrls:['./admin-view-sample.scss']
})

export class AdminReportComponent {
    constructor(
        private dialogRef: MatDialogRef<AdminReportComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
    ) {}
}