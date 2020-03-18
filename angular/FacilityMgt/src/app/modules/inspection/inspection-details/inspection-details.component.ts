import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Inspection } from 'src/app/models/Inspection';
import { AppState } from 'src/app/store/states/app.state';
import { getInspection, updateInspection } from 'src/app/store/actions/inspection.actions';
import { selectCurrentInspection, selectInspectionLoading } from 'src/app/store/selectors/inspection.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss']
})
export class InspectionDetailsComponent implements OnInit {

  inspection$: Observable<Inspection> = this.store.select(selectCurrentInspection);
  loading$: Observable<Boolean> = this.store.select(selectInspectionLoading);
  inspection: Inspection;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<InspectionDetailsComponent>) { }

  ngOnInit(): void {
    this.inspection$.subscribe(inspection => {
      this.inspection = inspection ? { ...inspection } : new Inspection();
    });
  }

  onSubmit(): void {
    this.store.dispatch(updateInspection({ inspection: this.inspection }));
    this.dialogRef.close();
  }

  onNoClick(event): void {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
