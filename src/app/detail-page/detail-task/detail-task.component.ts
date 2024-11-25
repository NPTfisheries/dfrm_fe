import { Component, OnInit, Input } from '@angular/core';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { Task } from 'src/_models/interfaces';
import { DivisionService } from 'src/_services/division.service';
import { Division } from 'src/_models/interfaces';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {

  @Input() tasks!: Task[] | any;

  buildImageUrl = buildImageUrl;

  divisions: Division[] | any = [];
  imageUrl: string | undefined;
  tasksByDivision: { [divisionId: number]: Task[] | any[] } = {};

  constructor(
    private divisionService: DivisionService
  ) { }

  ngOnInit(): void {
    this.divisionService.getDivisions().subscribe(divisions => {
      this.divisions = divisions;
      this.organizeTasksByDivision();
    });
  }

  private organizeTasksByDivision(): void {

    // Clear the previous grouping
    this.tasksByDivision = {};

    this.divisions.forEach((division: Division) => {
      this.tasksByDivision[division.id] = [];
    });

    if (this.tasks && Array.isArray(this.tasks)) {
      this.tasks.forEach((task: Task) => {
        const divisionId = (typeof task.division === 'object' && 'id' in task.division)
          ? Number(task.division.id)
          : Number(task.division);

        // Make sure the divisionId is valid and matches an existing division
        if (!isNaN(divisionId) && this.tasksByDivision[divisionId] !== undefined) {
          this.tasksByDivision[divisionId].push(task);
        }
      });
    }
    // console.log('organizeTasksByDivision');
    // console.log(this.tasksByDivision);
  }

}
