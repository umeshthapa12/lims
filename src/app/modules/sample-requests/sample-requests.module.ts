import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleRequestsComponent } from './sample-requests.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SampleRequestsService } from 'src/app/services/sample-request/sample-request.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignSampleDialogComponent } from './components/payment/assign-sample-dialog.component';
import { AssignSampleComponent } from './components/assign/assign-sample.component';

@NgModule({
  declarations: [
    SampleRequestsComponent,
    AssignSampleDialogComponent,
    AssignSampleComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: SampleRequestsComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,

    DeleteConfirmModule
   ],
  exports: [],
  providers: [SampleRequestsService],
})
export class SampleRequestsModule {}
