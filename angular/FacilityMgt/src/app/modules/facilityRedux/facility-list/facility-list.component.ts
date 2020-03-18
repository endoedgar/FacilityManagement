import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { MatTableDataSource } from "@angular/material/table";
import { Facility } from 'src/app/models/Facility';
import { selectAllFacilities$, selectFacilitiesLoading$ } from 'src/app/store/selectors/facility-redux.selectors';
import { GetFacilities } from 'src/app/store/actions/facility-redux.actions';

@Component({
  selector: "app-facility-list",
  templateUrl: "./facility-list.component.html",
  styleUrls: ["./facility-list.component.scss"]
})
export class FacilityListComponent implements OnInit {
  dataSource: MatTableDataSource<Facility>;
  displayedColumns: string[] = ["name", "type", "id"];
  loading$ = this.store.select(selectFacilitiesLoading$);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(GetFacilities());

    this.store.select(selectAllFacilities$).subscribe(facility => {
      this.dataSource = new MatTableDataSource(facility);
    });
  }
}
