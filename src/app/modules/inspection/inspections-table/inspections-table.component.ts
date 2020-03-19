import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Inspection } from "src/app/models/Inspection";
import { AppState } from "src/app/store/states/app.state";
import { Store } from "@ngrx/store";
import {
  selectAllInspections,
  selectCurrentInspection
} from "src/app/store/selectors/inspection.selectors";
import {
  selectInspection,
  deselectInspection
} from "src/app/store/actions/inspection.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-inspections-table",
  templateUrl: "./inspections-table.component.html",
  styleUrls: ["./inspections-table.component.scss"]
})
export class InspectionsTableComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[];
  inspectionsDS: MatTableDataSource<Inspection>;
  columnsToDisplay = [
    "facility",
    "type",
    "rating",
    "inspector",
    "id"
  ];
  currentInspection$ = this.store.select(selectCurrentInspection);
  currentInspection;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions$ = [
      this.currentInspection$.subscribe(
        currentInspection => (this.currentInspection = currentInspection)
      ),
      this.store.select(selectAllInspections).subscribe(state => {
        this.inspectionsDS = new MatTableDataSource<Inspection>(state);
      })
    ];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s$ => s$.unsubscribe());
  }

  selectInspection(inspection: Inspection) {
    if (inspection?._id == this.currentInspection?._id)
      this.store.dispatch(deselectInspection());
    else this.store.dispatch(selectInspection({ inspection }));
  }
}
