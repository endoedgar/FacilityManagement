import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inspection } from 'src/app/models/Inspection';
import { AppState } from 'src/app/store/states/app.state';
import { getInspections } from 'src/app/store/actions/inspection.actions';
import { selectAllInspections, selectInspectionLoading } from 'src/app/store/selectors/inspection.selectors';

@Component({
  selector: 'app-view-inspections',
  templateUrl: './view-inspections.component.html',
  styleUrls: ['./view-inspections.component.scss']
})
export class ViewInspectionsComponent implements OnInit {
  inspectionsDS: MatTableDataSource<Inspection>;
  loading$: Observable<Boolean> = this.store.select(selectInspectionLoading);
  columnsToDisplay = ["facility", "type", "rating", "inspector", "id", "edit"];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getInspections());
    try {
      this.store.select(selectAllInspections).subscribe(state => {
        this.inspectionsDS = new MatTableDataSource<Inspection>(state);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
