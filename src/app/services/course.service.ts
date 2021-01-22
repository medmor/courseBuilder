import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from './electron.service';
import { CourseNodeModel } from '../model/courseNode.model';
import { stringify, parse } from 'flatted';


@Injectable({
    providedIn: 'root'
})
export class CourseService {

    coursePath = '';
    course: CourseNodeModel;
    figures: string[] = [];

    constructor(private electronService: ElectronService, private zone: NgZone) { }

    openCourse() {
        const path = this.electronService.remote.dialog.showOpenDialogSync(undefined)[0];
        if (path) {
            this.electronService.fs.readFile(path, (err, jsonCourse) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.zone.run(() => {
                    this.course = parse(jsonCourse.toString());
                });
            });
            this.coursePath = path;
            console.log(this.coursePath);
        }
        else
            console.log("error" + path)
    }

    saveCourse() {
        const path = this.electronService.remote.dialog.showSaveDialogSync(undefined);
        if (path) {
            this.electronService.fs.writeFile(path, stringify(this.course), (err) => console.log(err));
            this.coursePath = path;
            console.log(this.coursePath);
        }
        else
            console.log("error" + path)
    }

    loadFigures() {
        this.electronService.fs.readFile('D:/ionic/quizProf/src/assets/levels/level2/unit1/chapter3/figures/' +/* html.substring(3, html.length - 4)  +*/ 'figure1.png', (err, data) => {
            if (err) {
                console.log(err);
                return;
            } else {
                this.figures.push(`data:image/png;base64,${data.toString('base64')}`);
            }
        })
    }
}