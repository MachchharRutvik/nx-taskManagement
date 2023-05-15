import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'task-management-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() task!: any;
  // @Input() deleteUser!: (id: any) => Observable<any>
  @Output() passId = new EventEmitter<[any,any,any,any ]>();
  // title: any = 'Edit User Details'
  constructor() {

  }
  editUser(id: number) {
    const isEdit = true;
    const isCompleted = false
    const isDelete = false;
    this.passId.emit([id, isDelete, isEdit,isCompleted]);
  }
  
  deleteUser(id:number){
    const isCompleted = false
    const isEdit = false;
    const isDelete = true;
    this.passId.emit([id, isDelete, isEdit,isCompleted]);
  }
  openAllDetails(id:number){
    const isCompleted = false
    const isEdit = false;
    const isDelete = false;
    this.passId.emit([id, isDelete, isEdit,isCompleted]);
  }
  taskCompleted(id:number){
    const isCompleted = true
    const isEdit = false;
    const isDelete = false;
    this.passId.emit([id, isDelete, isEdit,isCompleted]);
  }
}
