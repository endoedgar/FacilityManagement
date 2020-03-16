import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Inspection } from "src/app/models/Inspection";
import { AppState } from "src/app/store/states/app.state";
import { MatTableDataSource } from "@angular/material/table";
import { LoadInspections } from 'src/app/store/actions/inspections.actions';
import { selectAllInspections, selectInspectionsLoading } from 'src/app/store/selectors/inspections.selectors';

@Component({
  selector: "app-inspection-list",
  templateUrl: "./inspection-list.component.html",
  styleUrls: ["./inspection-list.component.scss"]
})
export class InspectionListComponent implements OnInit {
  dataSource: MatTableDataSource<Inspection>;
  displayedColumns: string[] = ["type", "rating", "id", "facility", "inspector" ];
  loading$ = this.store.select(selectInspectionsLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(LoadInspections());

    this.store.select(selectAllInspections).subscribe(inspections => {
      this.dataSource = new MatTableDataSource(inspections);
    });
  }
}
