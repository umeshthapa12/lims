import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TestReportService } from 'src/app/services/analyst/test-report/test-report.service';

@Component({
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.scss']
})
export class TestReportComponent implements OnInit, AfterViewInit {
  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'requestedDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: TestReportService
    ) { }

  ngOnInit(): void {
    this.intiForm();
  }

  intiForm() {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  reset() {

  }

  filter() {

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
