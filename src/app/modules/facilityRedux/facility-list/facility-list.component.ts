import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { MatTableDataSource } from "@angular/material/table";
import { selectAllFacilities$, selectFacilitiesLoading$, getCurrentFacility$, selectFacilitiesMapMode$ } from 'src/app/store/selectors/facility-redux.selectors';
import { GetFacilities, ChangeMode, SelectFacility } from 'src/app/store/actions/facility-redux.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MapModeEnum } from 'src/app/store/states/facility-redux.state';
import { FacilityRedux } from 'src/app/models/FacilityRedux';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-facility-list",
  templateUrl: "./facility-list.component.html",
  styleUrls: ["./facility-list.component.scss"]
})
export class FacilityListComponent implements OnInit, OnDestroy {
  
  subscriptions$: Subscription[];
  dataSource: MatTableDataSource<FacilityRedux>;
  displayedColumns: string[] = ["name", "type", "id"];
  loading$ = this.store.select(selectFacilitiesLoading$);
  facility$ = this.store.select(getCurrentFacility$);
  mapMode$ = this.store.select(selectFacilitiesMapMode$);
  mapMode: MapModeEnum;
  facility: FacilityRedux = {
    location: [null, null],
    _id: null,
    name: null,
    type: null
  };
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(GetFacilities());
    this.store.select(selectAllFacilities$).subscribe(facility => {
      this.dataSource = new MatTableDataSource(facility);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(s$ => s$.unsubscribe());
  }

  openFacility(row) {
    this.store.dispatch(ChangeMode({ mode: MapModeEnum.SELECT_FACILITY }));
    this.store.dispatch(SelectFacility({facility:row}));
  }

}

