import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowDetailsComponent } from './showDetails/show-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [FormComponent,ShowDetailsComponent ],
  exports: [FormComponent, ShowDetailsComponent],
})
export class TaskModalModule {}
