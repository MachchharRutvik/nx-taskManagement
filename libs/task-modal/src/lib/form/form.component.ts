import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ModalService } from '../modal.service';

@Component({
  selector: 'task-management-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  @Input() modal: NgbActiveModal | null = null;
  @Output() taskDetails = new EventEmitter<any>()
  @Input() title!:string
  @Input() button!:string

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.createForm()
  }
  createForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['',Validators.required]
    })
  }
  ngOnInit() {
  
  }
  onCancel() {
    this.modalService.closeModal()
  }
  onSubmit() {
    // Do something with form data
    const taskData = this.taskForm.getRawValue()
    console.log(taskData,"from form")
    this.taskDetails.emit(taskData)
    
  }

}
