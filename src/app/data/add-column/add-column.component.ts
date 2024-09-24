import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html'
})
export class AddColumnComponent {

  isSubmitting: boolean = false;
  newColumn: any;
  newColDef: ColDef = {};

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  addColumn() {
    console.log('adding Column');
    this.buildColDef();
    this.isSubmitting = true;
    this.activeModal.close(this.newColDef);
  }

  cancel() {
    console.log('Delete operation cancelled. Closing modal.');
    this.activeModal.close();
  }

  buildColDef() {
    const fieldName = this.newColumn.toLowerCase().replace(' ', '_');
    this.newColDef = {
      field: fieldName,
      headerName: this.newColumn,
      editable: true,
      filter: true,
    }
  }

}
