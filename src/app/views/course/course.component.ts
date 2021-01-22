import { Component } from '@angular/core';
import { CourseNodeModel } from '../../model/courseNode.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
})
export class CourseComponent {

  constructor(public courseService: CourseService) { }


  createNewCourse() {
    this.courseService.course = new CourseNodeModel(0, "Section", "", null, [], "")
  }

  saveCourse() {
    this.courseService.saveCourse();
  }
  openCourse() {
    this.courseService.openCourse();
  }
}
