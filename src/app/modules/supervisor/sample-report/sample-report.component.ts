import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { AssignComponent } from '../lab-request-details/component/assign.component';
import { ReAssignComponent } from './re-assign/re-assign';
import { ReCheckComponent } from './re-check/re-check';
import { VerificationComponent } from './verify/s-verify';
import { SupervisorViewRemarksComponent } from './view-remarks/view-remarks';
import { SupervisorViewRawDataComponent } from './view-raw-data/view-raw-data';

@Component({
  templateUrl: './sample-report.component.html',
  styleUrls: ['./sample-report.scss'],
  animations: [collectionInOut]
})
export class SampleReportComponent implements OnInit {

  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  loggedUserDetails:any;

  displayedColumns: string[] = ['sn', 'testType', 'parameterName', 'method', 'analyst','result','status','action'];
  dataSource = new MatTableDataSource<any>();

  rawDataSheet:any;

  viewRemarks(data, user) {
    if(user === 'analyst') {

    }else {
      data.remarks = data.supervisor_remarks;
    }
    this.dialog.open(SupervisorViewRemarksComponent, {
      data: data ? data : null
    })
  }

  constructor(
    private service: SampleReportService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog
    ) { 
      this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

  ngOnInit(): void {
    this.getReportDetails();
    this.isSampleSentForSupervisor();
    
  }

  downloadRawDatasheet(id) {
    let payload = {
      id:id
    }
    this.service.downloadRawData(id);
  }

  printRawData(id) {
    let payload = {
      id:id
    }
    this.service.printRawData(id);
  }

  getRawDataSheetDetails() {
    console.log(this.reportDetails, "REPORT")
    let id = this.reportDetails?.sample_form?.id
    this.service.getRawDataSheet(id).subscribe(res => {
      this.rawDataSheet = res;
    })
  }

  sentV() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id, 'kjhg')
    let payload = {
      sample_form: this.reportDetails?.sample_form?.id,
      is_verified: false,
      is_sent: true,
      super_visor_sample_form: [id],
      id: id
    }

    this.dialog.open(VerificationComponent, {
      data: payload ? payload: null
    })
  }


  sendForVerification() {
    this.isSending = true;
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      sample_form: id,
      is_verified: false,
      is_sent: true
    }

    this.service.sendReportForVerification(payload).subscribe(res => {
      // console.log(res, "HAHAHAHAHAHHHHHHH")
      this.toast.showToast(TOAST_STATE.success, 'Sample Sent for Verification Successfully!');
      // this.toast.showToast(
      //   TOAST_STATE.danger,
      //   'All the field(s) are not valid.');
      // this.dissmissMessage();
      this.dissmissMessage();
      this.isSampleSentForSupervisor()
      this.isSending = false;
    }, (error) => {
      this.isSending = false;
    })
  }

  dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);
  }

  reAssign(data) {
    console.log(data, this.reportDetails, 'ioas')
    let obj = { 
      commodity: this.reportDetails?.sample_form?.commodity.id,
      parameter: [data.id],
      sample_form: this.reportDetails.sample_form?.id,
      supervisor_user: [this.loggedUserDetails.id],
      form_available: 'analyst',
      super_visor_sample_form: this.route.snapshot.paramMap.get('id')
    }
    let instance: MatDialogRef<ReAssignComponent, any>;

    instance = this.dialog.open(ReAssignComponent, {
      data: obj ? obj : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getReportDetails();
    })
  }

  reCheck(value) {
    console.log(value, 'VAAAL')
    let id = this.route.snapshot.paramMap.get('id');
    let data = {
      sample_form: this.reportDetails.sample_form?.id,
      parameter: value.id,
      sample_form_has_parameter: value.sample_form_has_parameter
    }
    let instance: MatDialogRef<ReCheckComponent, any>;

    instance = this.dialog.open(ReCheckComponent, {
      data:  data ? data: null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getReportDetails();
    })
  }

  isSampleSentForSupervisor() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id
    }
    this.service.isSentForVrification(payload).subscribe(response => {
      // console.log(response, 'RESPONSE')
      this.sampleStatus = response.results;
    })
  }

  getReportDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id
    }
    this.service.getSamplesDetails(payload).subscribe(res => {
      this.reportDetails = res;
      this.isLoading = false;
      this.getRawDataSheetDetails();
    },
     (error) => {
      this.isLoading = false;
     })
  }

  viewRawData(a) {
    this.dialog.open(SupervisorViewRawDataComponent, {
      data: a? a : null,
      // width: '600px',
      maxHeight:'90vh',
      autoFocus: false,
    })
  }
}
