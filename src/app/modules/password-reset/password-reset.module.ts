import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';

@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: PasswordResetComponent}
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
   ],
  exports: [],
  providers: [ResetPasswordService],
})
export class PasswordResetModule {}
