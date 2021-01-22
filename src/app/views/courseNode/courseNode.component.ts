import { Component, Input, NgZone } from '@angular/core';

import { CourseNodeModel, courseNodeTypes } from '../../model/courseNode.model';
import { ElectronService } from '../../services/electron.service';


@Component({
  selector: 'course_node',
  templateUrl: './courseNode.component.html',
})
export class CourseNodeComponent {

  nodeTypes = courseNodeTypes;
  addingTitle = false;
  addingContent = false;
  hideContent = true;
  figure = '';
  @Input() node: CourseNodeModel;

  constructor(private electronService: ElectronService, private zone: NgZone) { }



  addChildNode() {
    this.node.children.push(new CourseNodeModel(this.node.children.length, "Section", "", this.node, [], ""));
    this.hideContent = false;
  }

  removeNode(index: number) {
    this.node.parent.children.splice(index, 1);
    for (let i = 0; i < this.node.parent.children.length; i++) {
      this.node.parent.children[i].index = i;
    }
  }

  upNode(index: number) {
    if (index - 1 >= 0) {
      const temp = this.node.parent.children[index - 1];
      this.node.parent.children[index - 1] = this.node.parent.children[index];
      this.node.parent.children[index - 1].index = index - 1;
      this.node.parent.children[index] = temp;
      this.node.parent.children[index].index = index;
    }
  }

  downNode(index: number) {
    if (index < this.node.parent.children.length - 1) {
      const temp = this.node.parent.children[index + 1];
      this.node.parent.children[index + 1] = this.node.parent.children[index];
      this.node.parent.children[index + 1].index = index + 1;
      this.node.parent.children[index] = temp;
      this.node.parent.children[index].index = index;
    }
  }

  logNode() {
    console.log(this.node)
  }
}
