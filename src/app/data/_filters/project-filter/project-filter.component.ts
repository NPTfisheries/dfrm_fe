import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent implements OnChanges {
  @Input() selectedDatastore!: number;

  @Output() datasetValue = new EventEmitter<any>();

  projects: any = [];
  selectedProject!: number | null; // select a project, return a dataset id
  filter: any = {};

  constructor(
    private cdmsService: CdmsService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDatastore'] && this.selectedDatastore) {
      this.getOptions();
      this.selectedProject = null;
    } else {
      // Clear projects if selectedDatastore is not set
      this.projects = [];
    }
  }

  handleChange(value: number | null) {
    var filter = { 'DatasetID': value };
    // console.log('Project Filter:', value);
    this.selectedProject = value;
    this.datasetValue.emit(filter);
  }

  getOptions() {
    this.cdmsService.getDatasetsList(this.selectedDatastore).subscribe(datasets => {
      let datasetsByProjects: any = []
      datasets.forEach(dataset => {
        // console.log('adding dataset...', dataset);
        datasetsByProjects.push(
          {
            'Id': dataset.datasetId,
            'Name': dataset.projectName
          }
        )
      })
      this.projects = datasetsByProjects;
    });
  }

}
