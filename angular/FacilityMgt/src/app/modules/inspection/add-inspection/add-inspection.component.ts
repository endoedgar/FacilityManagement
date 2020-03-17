import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/states/app.state';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.scss']
})
export class AddInspectionComponent implements OnInit {

  facility$: Observable<Facility>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
