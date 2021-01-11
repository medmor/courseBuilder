import { Component, Input, NgZone } from '@angular/core';
import { CourseNodeModel } from '../../model/courseNode.model';
import { ElectronService } from '../../services/electron.service';
import { stringify, parse } from 'flatted';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
})
export class CourseComponent {

  constructor(private electronService: ElectronService, private zone: NgZone) { }

  @Input() course: CourseNodeModel;

  createNewCourse() {
    this.course = new CourseNodeModel(0, "Section", "", null, [], "")
  }

  saveCourse() {
    const path = this.electronService.remote.dialog.showSaveDialogSync(undefined);
    if (path)
      this.electronService.fs.writeFile(path, stringify(this.course), (err) => console.log(err))
  }
  openCourse() {
    const path = this.electronService.remote.dialog.showOpenDialogSync(undefined)[0];
    if (path)
      this.electronService.fs.readFile(path, (err, jsonCourse) => {
        if (err) {
          console.log(err);
          return;
        }
        this.zone.run(() => {
          this.course = parse(jsonCourse.toString());
        });
      })
  }
}
