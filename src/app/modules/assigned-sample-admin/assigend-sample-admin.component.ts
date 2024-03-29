import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssignedSampleAdminService } from 'src/app/services/assigned-sample-admin/assigend-sample-admin.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({ 
  templateUrl: './assigend-sample-admin.component.html',
  styleUrls: ['./assigend-sample-admin.scss'],
  animations: [collectionInOut]
})
export class AssignedSampleAdminComponent implements OnInit {


  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId','sampleLabCode', 'sampleName','client', 'commodity', 'assignedDate', 'assigned', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statusList: any[] = [];

  clients: any[] =[];

  constructor(
    private fb: FormBuilder,
    private service: AssignedSampleAdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
    this.getStatusList();
    this.getClients();
  }

  getClients() {
    this.service.getCategories().subscribe(res => {
      this.clients = res.results;
    })
  }

  getClientName(id) {
    return this.clients.find(a => a.id === id)?.name;
  }

  getSamples() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '',
      size: '',
      from: '',
      to: '',
      status: '',
      client_category:''
    }
    this.service.getAssignedSampleDetails(payload).subscribe(response => {
      // console.log(response);
      // this.samples = response;
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
   }

  initFilterForm() {
    this.filterForm =  this.fb.group({
      search: '',
      from: '',
      to: '',
      status: '',
      client_category:''
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  reset() {
    this.filterForm.reset();
    this.getSamples();
  }

  viewAssignedSampleDetails(id) {
    this.router.navigate(['/dashboard/sample-assigned-details', id]);
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  getStatusList() {
    this.service.getStatusList().subscribe(res => {
      this.statusList = res;
    })
  }

  filter() {

    let from;
    let to;

    if(this.filterForm.value.from){
      from = this.format(this.filterForm.value.from);
    } else {
      from = '';
    }

    if(this.filterForm.value.to){
      to = this.format(this.filterForm.value.to);
    } else {
      to = '';
    }
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: from,
      to: to,
      status: this.filterForm.value.status,
      client_category:this.filterForm.value.client_category
    }
    this.service.getAssignedSampleDetails(payload).subscribe(response => {
      // console.log(response);
      // this.samples = response;
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }
}
