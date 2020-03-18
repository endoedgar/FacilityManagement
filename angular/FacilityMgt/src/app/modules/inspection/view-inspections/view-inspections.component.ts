import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inspection } from 'src/app/models/Inspection';
import { AppState } from 'src/app/store/states/app.state';
import { getInspections, selectInspection, deleteInspection } from 'src/app/store/actions/inspection.actions';
import { selectAllInspections, selectInspectionLoading } from 'src/app/store/selectors/inspection.selectors';
import { InspectionDetailsComponent } from '../inspection-details/inspection-details.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-inspections',
  templateUrl: './view-inspections.component.html',
  styleUrls: ['./view-inspections.component.scss']
})
export class ViewInspectionsComponent implements OnInit {
  inspectionsDS: MatTableDataSource<Inspection>;
  loading$ = this.store.select(selectInspectionLoading);
  columnsToDisplay = ["facility", "type", "rating", "inspector", "id", "edit", "delete"];

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(getInspections());
    this.store.select(selectAllInspections).subscribe(state => {
      this.inspectionsDS = new MatTableDataSource<Inspection>(state);
    });
  }

  editInspectionDialog(inspection: Inspection, event): void {
    event.stopPropagation();
    this.store.dispatch(selectInspection({ inspection }));
    const dialogRef = this.dialog.open(InspectionDetailsComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      console.log('The dialog was closed');
    });
  }

  deleteInspection(inspection: Inspection, event) {
    event.stopPropagation();
    if (confirm("Are You Sure?")) {
      this.store.dispatch(deleteInspection({ inspection }));
    }
  }

}
