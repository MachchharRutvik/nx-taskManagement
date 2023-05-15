import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';
import { Subject } from 'rxjs';
import { ShowDetailsComponent } from './showDetails/show-details.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private taskDetailsSubject = new Subject<any>();

  constructor(private modal:NgbModal) { }
  openModal(title: string,button:any,tasks:any) {
    const modalRef = this.modal.open(FormComponent);
    if (tasks) {
      modalRef.componentInstance.taskForm.patchValue({
        title: tasks.title,
        description: tasks.description,
        category: tasks.category,
      });
    }

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.button = button
    modalRef.componentInstance.taskDetails.subscribe((taskData: any) => {
      this.taskDetailsSubject.next(taskData);
    });

  }
  showDetails(task:any){
    const modalRef = this.modal.open(ShowDetailsComponent);
    modalRef.componentInstance.task = task
    
  }
  closeModal() {
    const modalRef = this.modal.dismissAll(FormComponent);
  }

  getTaskDetails() {
    return this.taskDetailsSubject.asObservable();
  }}

