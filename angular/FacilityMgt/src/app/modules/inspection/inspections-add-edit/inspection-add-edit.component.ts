import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription, merge } from "rxjs";
import { Inspection } from "src/app/models/Inspection";
import { AppState } from "src/app/store/states/app.state";
import {
  updateInspection,
  createInspection,
  changeInspectionMapMode,
  deselectInspection
} from "src/app/store/actions/inspection.actions";
import {
  selectCurrentInspection,
  selectInspectionLoading,
  selectInspectionMapMode
} from "src/app/store/selectors/inspection.selectors";
import { InspectionMapModeEnum } from "src/app/store/states/inspection.state";
import { getCurrentFacility$ } from "src/app/store/selectors/facility-redux.selectors";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-inspection-add-edit",
  templateUrl: "./inspection-add-edit.component.html",
  styleUrls: ["./inspection-add-edit.component.scss"]
})
export class InspectionAddEditComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[];

  inspection$ = this.store.select(selectCurrentInspection);
  mapMode$ = this.store.select(selectInspectionMapMode);
  loading$ = this.store.select(selectInspectionLoading);
  facility$ = this.store.select(getCurrentFacility$);

  inspection: Inspection;
  facility: FacilityRedux;
  mapMode: InspectionMapModeEnum;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions$ = [
      merge(this.facility$, this.inspection$.pipe(map(i => i?.facility)))
        .pipe(
          filter((i): i is FacilityRedux => true),
          filter(i => i != null)
        )

        .subscribe(facility => (this.facility = facility)),
      this.inspection$.subscribe(
        inspection =>
          (this.inspection = inspection ? { ...inspection } : new Inspection())
      ),
      this.mapMode$.subscribe(mapMode => (this.mapMode = mapMode))
    ];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s$ => s$.unsubscribe());
  }

  onSubmit(): void {
    if (this.mapMode == InspectionMapModeEnum.CREATE_INSPECTION) {
      this.inspection.facility = this.facility;
      this.store.dispatch(createInspection({ inspection: this.inspection }));
    } else {
      this.store.dispatch(updateInspection({ inspection: this.inspection }));
    }
  }

  onCancel(): void {
    this.store.dispatch(deselectInspection());
    this.store.dispatch(
      changeInspectionMapMode({ mode: InspectionMapModeEnum.NONE })
    );
  }
}
