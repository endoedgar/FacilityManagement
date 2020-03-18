import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { MatTableDataSource } from "@angular/material/table";
import { FacilityRedux } from 'src/app/models/FacilityRedux';
import { selectAllFacilities$, selectFacilitiesLoading$ } from 'src/app/store/selectors/facility-redux.selectors';
import { GetFacilities } from 'src/app/store/actions/facility-redux.actions';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-facility-list",
  templateUrl: "./facility-list.component.html",
  styleUrls: ["./facility-list.component.scss"]
})
export class FacilityListComponent implements OnInit {
  dataSource: MatTableDataSource<FacilityRedux>;
  displayedColumns: string[] = ["name", "type", "id"];
  loading$ = this.store.select(selectFacilitiesLoading$);
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(private store: Store<AppState>) {}

  
  ngOnInit() {
    this.store.dispatch(GetFacilities());

    this.store.select(selectAllFacilities$).subscribe(facility => {
      this.dataSource = new MatTableDataSource(facility);
      this.dataSource.paginator = this.paginator;
    });
  }
}

