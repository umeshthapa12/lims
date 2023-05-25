import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportViewService } from 'src/app/services/report-view/report-view.service';

@Component({
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

  statusList: any = [];

  filterForm: FormGroup;

  userDetails: any;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private service: ReportViewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title.setTitle('Report View - Laboratory Information Management System');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search_text: '',
      status: '',
      from: '',
      to: ''
    })
  }

  getSamples() {
    let payload = {
      search:'',
      to: '',
      from: '',
      page: '',
      size: '',
      user: this.userDetails.email
    }
    this.service.getMySamples(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isLoading = false;
    })
  }

  filterUserList() {
    let payload = {
      search:this.filterForm.value.search_text,
      to: '',
      from: '',
      page: '',
      size: ''
    }
    this.service.getMySamples(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isLoading = false;
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
  }


}
