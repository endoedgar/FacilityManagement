import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { getInspection } from 'src/app/store/actions/inspection.actions';
import { Inspection } from 'src/app/models/Inspection';
import { getCurrentInspection } from 'src/app/store/selectors/inspections.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss']
})
export class InspectionDetailsComponent implements OnInit {

  inspection: Inspection;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
