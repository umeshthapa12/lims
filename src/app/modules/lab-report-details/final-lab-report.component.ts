import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalLabReportService } from 'src/app/services/lab-report-details/final-lab-report.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './final-lab-report.component.html',
  styleUrls: ['./final-lab-report.scss'],
  animations: [collectionInOut]
})
export class FinalLabReportComponent implements OnInit {
  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;
  tStatus = 'pending'


  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'parameter', 'assignedDate', 'assignTo', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sampleDetails: any;

  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FinalLabReportService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.getAssignedSamples()
  }

  assign() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/dashboard/lab-sample-details',sampleId])
  }

  generateReport() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/dashboard/report', sampleId]);
  }

  getAssignedSamples() {
    this.isLoading = true;
    let sampleId =this.route.snapshot.paramMap.get('id');
    let payload = {
      id: sampleId
    }
    this.service.getLabReportDetails(payload).subscribe(res => {
      // console.log(res, 'RES')
      this.dataSource.data = res.parameters;
      this.sampleDetails = res;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status:'',
      from: '',
      to: ''
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  filter() {
    this.isFilterBtnLoading = true;

    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search,
      from : this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to),
      status: this.filterForm.value.status
    }
  }

  resetFilter() {
    this.filterForm.reset();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}

