import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SampleRequestsService } from 'src/app/services/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './re-assign-supervisor.html',
//   styleUrls: ['./re-assign.scss']
})
export class ReAssignSupervisorComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  users: any[] = [];
  isLoading: boolean = false;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  message: any
  responseError = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReAssignSupervisorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: SampleRequestsService,
    private toast: ToastService,
    private router: Router
  ) {

    this.genericValidator = new GenericValidator({
      'supervisor_user': {
        'required': 'User is required.'
      }
    })

    // console.log(data, "ADSASRE")
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserList();
  }

  getUserList() {
    let payload = {
      search: '',
      page: '',
      size: '',
      role: '3',
      client_category_id: ''
    }

    this.service.getUsersList(payload).subscribe(res => {
      let arr = [];
      if(this.data.test_type === 'Instrumental') {
        res.forEach(el => {
          if(el.test_type.includes(3)) {
            arr.push(el)
          }
        });
        this.users = arr
      } else if(this.data.test_type === 'Chemical') {
        res.forEach(el => {
          if(el.test_type.includes(1)) {
            arr.push(el)
          }
        });
        this.users = arr
      } else if(this.data.test_type === 'Microbiological') {
        res.forEach(el => {
          if(el.test_type.includes(2)) {
            arr.push(el)
          }
        });
        this.users = arr
      } else {
        arr = [];
      }
    })
  }

  private initForm() {
    this.form = this.fb.group({
      supervisor_user: ['', Validators.required],
      form_available: '',
      sample_form: '',

    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  assignSampleToSupervisor() {
    this.isLoading = true;
    let payload = this.data;
    payload.supervisor_user = this.form.value.supervisor_user;
    this.service.assignParameterToSupervisor(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res?.message);
      // console.log(res, 'Assigned..')
      this.dialogRef.close();
      this.isLoading = false;
      this.dismissMessage();
    },(error) => {
      this.isLoading = false;
      this.responseError = error.error;
    })
  }

  submit() {
    this.isLoading = true;
    if (this.form.pristine) {
      this.message = {};
      this.isLoading = false;
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }
    let payload = {
      supervisor_user: this.form.value.supervisor_user,
      form_available: 'supervisor',
      // sample_form: this.data?.id
      // parameter: this.data?.parameters,
      // commodity_id: this.data?.commodity_id
    }

    this.service.assignSampleToSupervisor(payload, this.data.id).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res?.message);
      this.router.navigate(['/dashboard/sample-assigned']);
      this.dialogRef.close();
      this.isLoading = false;
      this.dismissMessage();
    },
      (error) => {
        this.isLoading = false;
        if (error.status === 400) {
          this.toast.showToast(
            TOAST_STATE.danger,
            'All the field(s) are not valid.');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        } else if (error.status === 500 && error.status > 500) {

          this.toast.showToast(
            TOAST_STATE.danger,
            'Internal Server Error');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);


        } else {
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.error);

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }
        this.isLoading = false;

      })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 1000);
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.form, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngAfterViewInit(): void {
    this.validation();
  }
}
