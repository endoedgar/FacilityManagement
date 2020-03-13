import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [InputFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  exports:[
    InputFormComponent,
  ]
})
export class FormModule { }
