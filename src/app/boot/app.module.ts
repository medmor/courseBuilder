import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AppComponent } from './app.component';
import { CourseNodeComponent } from '../views/courseNode/courseNode.component';
import { CourseComponent } from '../views/course/course.component';
import { EditableAreaComponent } from '../views/editableArea/editableArea.component';


@NgModule({
  declarations: [AppComponent, CourseNodeComponent, CourseComponent, EditableAreaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
