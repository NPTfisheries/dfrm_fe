import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AlertService } from 'src/_services/alert.service';
import { DepartmentService } from 'src/_services/department.service';
import { Department } from 'src/_models/department';

import { formatLabel } from 'src/_helpers/formatLabel';

interface Fields {
  [key: string]: string;
}

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent {
  form!: FormGroup;
  formatLabel = formatLabel
  loading = false;
  submitted = false;
  department: Department | null = null;

  fields: Fields = {
    name: 'text',
    description: 'text',
    manager: 'text',
    deputy: 'text',
    assistant: 'text',
  };

  get fieldsKeys(): string[] {
    return Object.keys(this.fields);
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private departmentService: DepartmentService,
    private alertService: AlertService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({});

    // Adding form controls dynamically based on fields

    for (const key of this.fieldsKeys) {
      const validators = this.fields[key] === 'text' ? [Validators.required] : [];
      this.form.addControl(key, this.formBuilder.control('', validators));
    }
    
    this.departmentService.department$.subscribe(department => {
      this.department = department;
    });
  }

  onSubmit() {
    console.log('clicked update department');
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.departmentService.createDepartment(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Department creation successful!');
          // reset the form to allow for another round.
          this.form.reset();
          this.loading = false;
          this.submitted = false;
        },
        error: response => {
          // console.log(response);
          this.alertService.error('Error: Department Creation Failed!');
          this.loading = false;
        }
      })
    ;
    this.activeModal.close();
  }
}
