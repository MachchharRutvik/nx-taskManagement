import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'task-management-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent {
  constructor(private modal:ModalService){

  }
  @Input() task!: any;
  closeDetails() {
    this.modal.closeModal();
  }
}
