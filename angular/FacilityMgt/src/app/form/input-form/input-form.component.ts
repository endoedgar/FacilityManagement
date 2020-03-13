import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
 
  control: FormControl;
  control1: FormControl;

  constructor(private fb: FormBuilder) {
    this.control = fb.control({value: 'my val', disabled: false});
  }

  ngOnInit(): void {
  }

}
