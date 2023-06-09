import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

import { AddOrUpdateCategoryComponent } from './coponents/add-or-update-category.component';
import { ClientCategoryComponent } from './client-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings/category/settings.service';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ClientCategoryComponent,
    AddOrUpdateCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:ClientCategoryComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    DeleteConfirmModule
   ],
  exports: [],
  providers: [SettingsService]
})
export class ClientCategoryModule {}
