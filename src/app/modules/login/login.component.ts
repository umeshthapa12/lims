import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

/** Custom components/directives */
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { LoginModel } from 'src/app/models/login.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { ServerResponse } from 'http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [rowsAnimation]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly toDestroy$ = new Subject<void>();

  hidePass = true;

  loginForm: FormGroup;

  isLoading: boolean;
  message: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  isMobileDevice = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private title: Title, 
    private router: Router,
    private responsive: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private authenticationService: AuthenticationService
  ) {

    localStorage.clear();
    this.title.setTitle('Login - Laboratory Information Management System');

    this.genericValidator = new GenericValidator({
      'email': {
        'required': 'Email is required.'
      },
      'password': {
        'required': 'Password is required.'
      }
    })
  }

  goToHome() {
    this.router.navigate(['/login']);
  }

  gotoPricing() {
    this.router.navigate(['/commodity-pricing']);
  }

  gotoComplain() {
    this.router.navigate(['/complain']);
  }

  gotoFeedback() {
    this.router.navigate(['/feedback']);
  }

  gotoUserManual() {
    this.router.navigate(['/user-manual']);
  }

  gotoVideoManual() {
    this.router.navigate(['/video-manual']);
  }

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall)
    .subscribe(result => {
      console.log(result.matches, 'DEVICE....')
      if (result.matches) {
        this.isMobileDevice = true;
      }

    });
    
    this.dismissMessage();
    this.initForm();
  }


  private initForm() {
    this.loginForm = this.fb.group({
      id: '',
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  removeSpace(value) {
     return value.replace(/\s/g, '');
  }

  saveChanges() {
    if (this.loginForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    this.isLoading = true;

    let payload: LoginModel = {
      email: this.removeSpace(this.loginForm.value.email),
      password: this.loginForm.value.password
    }

    this.authenticationService.userLogin(payload).subscribe(response => {
      this.toast.showToast(
        TOAST_STATE.success,
        response.message);
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        this.dismissMessage();
      }, 1000);

      this.message = {};
    },
      (error) => {
        if (error.status === 400) {
          this.toast.showToast(
            TOAST_STATE.danger,
            'All the field(s) are not valid.');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }else if(error.status === 500 || error.status > 500 ) {

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

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  ngAfterViewInit(): void {
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.loginForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
