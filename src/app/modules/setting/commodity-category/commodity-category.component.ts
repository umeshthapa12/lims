import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/category/settings.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { AddOrUpdateCategoryComponent } from '../category/coponents/add-or-update-category.component';
import { AddOrUpdateCommodityCategoryComponent } from './components/add-or-update-commodity-category.component';

@Component({
  templateUrl: './commodity-category.component.html',
  styleUrls: ['./commodity-category.scss'],
  animations: [collectionInOut]
})
export class CommodityCategoriesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['sn', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categoryForm: FormGroup;

  isLoading: boolean = true;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  filterForm: FormGroup;

  message:any = {};
  responseError = null;
  formBtnLoading = false;

  loggedUserDetails: any;

  constructor(
    public dialog: MatDialog,
    private sService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      }
    })
   }

   addCategory() {

    let instance: MatDialogRef<AddOrUpdateCommodityCategoryComponent, any>
    instance = this.dialog.open(AddOrUpdateCommodityCategoryComponent, {
      width: '800px',
      data: ''
    })

    instance.afterClosed().subscribe(res => {
      this.getCategories();
    })
   }

   editCategory(data) {

    let instance: MatDialogRef<AddOrUpdateCommodityCategoryComponent, any>
    instance = this.dialog.open(AddOrUpdateCommodityCategoryComponent, {
      width: '800px',
      data: data
    })

    instance.afterClosed().subscribe(res => {
      this.getCategories();
    })
   }

  private initForm() {
    this.initFilterForm();

    this.categoryForm = this.fb.group({
      name: [''],
      name_nepali: [''],
      address: [''],
      reg_no: ['']
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: ''
    }
    this.sService.getAllCommodityCategoriesLimited(payload).subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  getCategories() {
    let payload = {
      search: ' ',
      page: ' ',
      size: '200'
    }
    this.sService.getAllCommodityCategoriesLimited(payload).subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    },(error) => {

    })
  }

  resetFilter() {
    this.isLoading = true;
    this.filterForm.reset();
    this.getCategories();
  }

  openDialog(data) {
    this.existingCategory = data;
    this.patchForm(data);
    // console.log(data, 'data..')
    // let instance: MatDialogRef<AddOrUpdateCommodityCategoryComponent, any>;
    // instance = this.dialog.open(AddOrUpdateCommodityCategoryComponent, {
    //   width:'500px',
    //   data: data ? data : {},
    //   autoFocus: false,
    // });

    // instance.afterClosed().subscribe(result => {
    //   this.getCategories();
    // });
  }

  patchForm(data) {
    this.categoryForm.patchValue(
      { name: data.name,name_nepali:data.name_nepali })
      window.scroll(0,0)
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteCategory(id).pipe(delay(400)).subscribe(_ => {
          this.getCategories();
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveChanges() {
    this.formBtnLoading = true;
    if (this.existingCategory?.id) {
      this.sService.updateCategory(this.categoryForm.value, this.existingCategory.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getCategories();
        this.dismissMessage();
        this.categoryForm.reset();
        this.categoryForm.clearValidators();
        this.existingCategory = null;

        this.message = {};
        this.responseError =null;
        this.formBtnLoading = false;
      }, (error) => {
        this.message = {};
      this.responseError = error.error;
      this.formBtnLoading = false;
      })
    } else {
      this.sService.addCategory(this.categoryForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getCategories();
        this.dismissMessage();
        this.categoryForm.reset();
        this.categoryForm.clearValidators();
        this.existingCategory = null;

        this.message = {};
        this.responseError = null;
        this.formBtnLoading = false;
      }, (error)=> {
        this.message = {};
        this.responseError = error.error;
        this.formBtnLoading = false;
      })
    }
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  reset() {
    this.categoryForm.reset();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.categoryForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

}
