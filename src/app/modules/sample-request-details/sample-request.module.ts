import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SampleRequestDetailsComponent } from './sample-request-details';
import { SampleRequestDetailsService } from 'src/app/services/sample-request-details/sample-request-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignSampleDialogComponent } from './payment/assign-sample-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AssignSampleComponent } from './assign/assign-sample.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentReceiptComponent } from './receipt/receipt';
import { RejectComponent } from './reject-sample';
import { AvatarModule } from 'ngx-avatar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecheckComponent } from './recheck-sample';

@NgModule({
  declarations: [SampleRequestDetailsComponent, AssignSampleDialogComponent, AssignSampleComponent,PaymentReceiptComponent, RejectComponent,RecheckComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleRequestDetailsComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatIconModule,
    MatTooltipModule,

    AvatarModule,

    SharedModule
   ],
  exports: [],
  providers: [SampleRequestDetailsService, DatePipe],
})
export class SampleRequestDetailsModule {}
