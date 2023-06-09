import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SampleVerifyService } from 'src/app/services/verifier/sample-verify/sample-verify.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './sample-verify.component.html',
  styleUrls: ['./sample-verify.scss'],
  animations: [collectionInOut]
})
export class SampleVerifyComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = false;

  statusList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: SampleVerifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSampleDetails();
    this.getStatusList();
  }

  getStatusList() {
    this.service.getStatusList().subscribe(res => {
      this.statusList = res;
    })
  }

  viewRequestDetails(id) {
    this.router.navigate(['/dashboard/verify-sample-report', id]);
  }

  initForm() {
    this.filterForm = this.fb.group({
      search: '',
      status: ''
    })
  }

  getSampleDetails() {
    this.isLoading = true;
    let payload = {
      search: '',
      status: ''
    }
    this.service.getSmaples(payload).subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    })
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      status: this.filterForm.value.status
    }

    this.service.getSmaples(payload).subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    })
  }

  reset() {
    this.filterForm.reset();
    this.isLoading = true;
    this.getSampleDetails();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
