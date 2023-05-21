import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, delay } from 'rxjs';
import { ParameterService } from 'src/app/services/commodities/parameter/parameter.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.scss'],
  animations: [collectionInOut, rowsAnimation ]
})
export class ParameterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'name', 'commodities','testType', 'price','testMethod','mandatoryStandards','formula', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  parameterForm: FormGroup;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  commodityCategories: any[] = [];

  listOfParameters: Observable<any>;

  commodities: any[] = [];

  filterForm: FormGroup;

  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private sService: ParameterService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      },
      'test_type': {
        'required': 'Test Type is required.'
      },
      'commodity': {
        'required': 'Commodity Category is required.'
      },
      'ref_test_method': {
        'required': 'Test Method is required.'
      },
      'units': {
        'required': 'Units is required.'
      },
      'mandatory_standard': {
        'required': 'Mandatory Standard is required.'
      },
      'price': {
        'required': 'Price is required.'
      },
      'formula': {
        'required': 'Formula is required.'
      },
    })
   }

  private initForm() {
    this.parameterForm = this.fb.group({
      // name: ['', Validators.required],
      // test_type: ['', Validators.required],
      // commodity_category: ['', Validators.required],
      // ref_test_method: ['', Validators.required],
      // units: ['', Validators.required],
      // mandatory_standard: ['', Validators.required],
      // price: ['', Validators.required],
      // remarks: '.',
      // formula: ['', Validators.required]

      id: '',

      name: ['', Validators.required],
      test_type: [''],
      commodity: [''],
      ref_test_method: [''],
      units: [''],
      mandatory_standard: [''],
      price: [''],
      remarks: '.',
      formula: ['']
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getParameters();
    this.getCommodityCategories();
    this.getCommodities();
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      test_type: ''
    })
  }

  getCommodityCategories() {
    let payload = {
      search: '',
      page: '',
      size: ''
    }
    this.cService.getAllCommodityCategories(payload).subscribe(response => {
      this.commodityCategories = response.results;
    })
  }

  getCommodities() {
    this.sService.getCommodities().subscribe(res => {
      this.commodities = res.results;
    })
  }

  getParameters() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '1',
      size: '10',
      test_type: ''
    }
    this.sService.getParameters(payload).subscribe(res => {
      this.dataSource = res;
      this.listOfParameters = res.results;
      this.isLoading = false;
    })
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      test_type: this.filterForm.value.test_type
    }
    this.sService.getParameters(payload).subscribe(res => {
      this.dataSource = res;
      this.listOfParameters = res;
      this.isLoading = false;
    })
  }

  resetFilter() {
    this.filterForm.reset();
    this.getParameters();
  }

  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }

  openDialog(data) {
    this.existingCategory = data;
    this.patchForm(data)
  }

  patchForm(data) {
    this.parameterForm.patchValue(
      {
        id: data?.id,
        name: data?.name,
        test_type: data?.test_type,
        commodity: data?.commodity,
        ref_test_method: data?.ref_test_method,
        units: data?.units,
        mandatory_standard: data?.mandatory_standard,
        formula: data?.formula,
        price: data?.price,
      })
      console.log(this.parameterForm.value, 'parameter value')
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteParameter(id).pipe(delay(400)).subscribe(_ => {
          this.getParameters();
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveChanges() {

    let payload = {
      test_type: this.parameterForm.value.test_type
    }
    if (this.existingCategory?.id) {
      this.sService.updateParameter(this.parameterForm.value, this.existingCategory.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getParameters();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
      },
      (error) => {
        if (error.status === 400) {
          this.toast.showToast(
            TOAST_STATE.danger,
            'All the field(s) are not valid.');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }else if(error.status === 500) {

          this.toast.showToast(
            TOAST_STATE.danger,
            'Internal Server Error');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);


        } else {
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.error);

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }

      })
    } else {
      console.log(this.parameterForm.value, "PARAAMETER VALUES")
      this.sService.addParameter(this.parameterForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getParameters();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
      },
      (error) => {
        if (error.status === 400) {
          this.toast.showToast(
            TOAST_STATE.danger,
            'All the field(s) are not valid.');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }else if(error.status === 500) {

          this.toast.showToast(
            TOAST_STATE.danger,
            'Internal Server Error');

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);


        } else {
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.error);

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }

      })
    }
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  reset() {
    this.parameterForm.reset();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.parameterForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}