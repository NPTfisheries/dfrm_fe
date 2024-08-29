import { Component, Output, EventEmitter } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent {
  @Output() projectValue = new EventEmitter<number>();

  projects: any = [];
  selectedProject!: number;

  constructor(
    private cdmsService: CdmsService,
  ) { }

  ngOnInit(): void {
    this.cdmsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  handleChange(value: number) {
    console.log('Project Filter:', value, typeof (value));
    this.selectedProject = value;
    this.projectValue.emit(value);
  }

}
