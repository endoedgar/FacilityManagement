import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { AppState } from "src/app/store/states/app.state";
import {
  getInspections,
  changeInspectionMapMode,
  getFacilityInspections
} from "src/app/store/actions/inspection.actions";
import {
  selectInspectionLoading,
  selectInspectionMapMode
} from "src/app/store/selectors/inspection.selectors";
import { MatDialog } from "@angular/material/dialog";
import { GetFacilities } from "src/app/store/actions/facility-redux.actions";
import {
  selectFacilitiesLoading$,
  getCurrentFacility$
} from "src/app/store/selectors/facility-redux.selectors";
import { map, distinct, distinctUntilChanged } from "rxjs/operators";
import { InspectionMapModeEnum } from "src/app/store/states/inspection.state";

@Component({
  selector: "app-view-inspections",
  templateUrl: "./view-inspections.component.html",
  styleUrls: ["./view-inspections.component.scss"]
})
export class ViewInspectionsComponent implements OnInit {
  mapMode$ = this.store.select(selectInspectionMapMode);
  selectedFacility$ = this.store.select(getCurrentFacility$);

  loading$ = combineLatest(
    this.store.select(selectInspectionLoading),
    this.store.select(selectFacilitiesLoading$)
  ).pipe(map(([a, b]) => a || b));

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(GetFacilities());

    combineLatest(
      this.selectedFacility$.pipe(distinctUntilChanged()),
      this.mapMode$
    ).subscribe(([facility, mapMode]) => {
      if (mapMode == InspectionMapModeEnum.NONE)
        facility
          ? this.store.dispatch(
              getFacilityInspections({ facilityId: facility._id })
            )
          : this.store.dispatch(getInspections());
    });
  }

  createInspection() {
    this.store.dispatch(
      changeInspectionMapMode({ mode: InspectionMapModeEnum.CREATE_INSPECTION })
    );
  }
}
