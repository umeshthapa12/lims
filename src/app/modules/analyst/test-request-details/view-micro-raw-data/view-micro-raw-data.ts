import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import  NepaliDate from 'nepali-datetime'
import { DatePipe } from '@angular/common';
@Component({
    templateUrl: './view-micro-raw-data.html',
    styleUrls: ['./view-micro-raw-data.scss']
})

export class ViewMicroRawDataComponent {

    constructor(
        private dialogRef: MatDialogRef<ViewMicroRawDataComponent>,
        private pipe: DatePipe,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) { 
    }

    closeDialog() {
        this.dialogRef.close();
    }

    convertToNepaliDate(enDate) {


        let nepDate:any = {};
        const eng = enDate.split('-');
        let time = this.pipe.transform(enDate, 'hh:mm:ss');
        nepDate.year = parseInt(eng[0], 10);
        nepDate.month = parseInt(eng[1], 10);
        nepDate.day = parseInt(eng[2], 10);
        nepDate.hour = Number(time.slice(0,2));
        nepDate.minute = Number(time.slice(3,5));
        let npDate = NepaliDate.fromEnglishDate(nepDate.year, nepDate.month-1, nepDate.day, nepDate.hour, nepDate.minute, 0);
        return `${npDate.year}-${npDate.month+1}-${npDate.day}`;
      }

    splitStringByComma(input: string): string[] {
        const result: string[] = input?.split(',');
        return result;
      }
    
      parseJSON(data) {
        // console.log(JSON.parse(data), 'oi')
        return JSON.parse(data);
      }

}