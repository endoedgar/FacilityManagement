import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Inspection } from 'src/app/models/Inspection';
import { AppState } from 'src/app/store/states/app.state';
import { getInspection, updateInspection } from 'src/app/store/actions/inspection.actions';
import { selectCurrentInspection, selectInspectionLoading } from 'src/app/store/selectors/inspection.selectors';
import { getCurrentUser } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss']
})
export class InspectionDetailsComponent implements OnInit {

  inspection$: Observable<Inspection> = this.store.select(selectCurrentInspection);
  loading$: Observable<Boolean> = this.store.select(selectInspectionLoading);
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(getInspection({ inspectionId: params.get("inspection_id") }))
    );
  }

  onSubmit() {
    this.inspection$.subscribe(async inspection => this.store.dispatch(updateInspection({ inspection })));
  }

}
