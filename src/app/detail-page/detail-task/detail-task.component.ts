import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { TaskService } from 'src/_services/task.service';
import { Task } from 'src/_models/interfaces';
import { Division } from 'src/_models/interfaces';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit, OnChanges {

  @Input() projectId!: number;
  @Input() division!: Division;

  data: any[] = [];

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].isFirstChange()) {
      this.getList();
    }
  }

  getList() {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      this.data = tasks.filter((task: Task) => {
        if (typeof task.division === 'object' && 'id' in task.division) {
          return task.division.id === this.division.id;
        } else if (typeof task.division === 'number') {
          return task.division === this.division.id;
        }
        return false;
      });
    });
  }

  getImageUrl(imagePath: string) {
    return buildImageUrl(imagePath);
  }

}
