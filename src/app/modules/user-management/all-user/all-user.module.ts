import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-user.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AllUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AllUsersComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
   ],
  exports: [],
  providers: [],
})
export class AllUsersModule {}
