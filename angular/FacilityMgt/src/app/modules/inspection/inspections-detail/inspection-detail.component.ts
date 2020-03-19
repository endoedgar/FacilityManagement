import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Inspection } from "src/app/models/Inspection";
import { AppState } from "src/app/store/states/app.state";
import {
  selectCurrentInspection,
  selectInspectionLoading,
  selectInspectionMapMode
} from "src/app/store/selectors/inspection.selectors";
import { InspectionMapModeEnum } from "src/app/store/states/inspection.state";
import { getCurrentFacility$ } from "src/app/store/selectors/facility-redux.selectors";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { deleteInspection, selectInspection, changeInspectionMapMode } from 'src/app/store/actions/inspection.actions';
import { SelectFacility } from 'src/app/store/actions/facility-redux.actions';

@Component({
  selector: "app-inspection-detail",
  templateUrl: "./inspection-detail.component.html",
  styleUrls: ["./inspection-detail.component.scss"]
})
export class InspectionDetailComponent implements OnInit, OnDestroy {
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
      this.inspection$.subscribe(
        inspection => this.inspection = inspection
      ),
      this.mapMode$.subscribe(mapMode => (this.mapMode = mapMode))
    ];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s$ => s$.unsubscribe());
  }

  deleteInspection(inspection: Inspection, event) {
    event.stopPropagation();
    if (confirm("Are You Sure?")) {
      this.store.dispatch(deleteInspection({ inspection }));
    }
  }

  editInspectionDialog(inspection: Inspection, event): void {
    event.stopPropagation();
    this.store.dispatch(selectInspection({ inspection }));
    this.store.dispatch(
      changeInspectionMapMode({ mode: InspectionMapModeEnum.EDIT_INSPECTION })
    );
    this.store.dispatch(SelectFacility({ facility: inspection.facility }));
  }
}
