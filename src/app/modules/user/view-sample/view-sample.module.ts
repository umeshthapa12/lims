import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSampleComponent } from './view-sample.component';
import { RouterModule } from '@angular/router';
import { ViewSampleService } from 'src/app/services/user/view-sample/view-sample.service';

@NgModule({
  declarations: [ViewSampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ViewSampleComponent}
    ])
   ],
  exports: [],
  providers: [ViewSampleService],
})
export class ViewSampleModule {}