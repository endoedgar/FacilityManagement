import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inspection } from 'src/app/models/Inspection';
import { selectAllInspections } from 'src/app/store/selectors/inspection.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { getInspections } from 'src/app/store/actions/inspection.actions';
import { selectInspectionsLoading } from 'src/app/store/selectors/inspections.selectors';

@Component({
  selector: 'app-view-inspections',
  templateUrl: './view-inspections.component.html',
  styleUrls: ['./view-inspections.component.scss']
})
export class ViewInspectionsComponent implements OnInit {
  inspections: MatTableDataSource<Inspection>;
  columnsToDisplay = ["facility", "type", "rating", "inspector", "edit"];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getInspections());
    try {
      this.store.select(selectAllInspections).subscribe(state => {
        this.inspections = new MatTableDataSource<Inspection>(state);
      });
    } catch (error) {
      console.error(error);
    }

  }

}
