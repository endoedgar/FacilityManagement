import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import {
  addFacility,
  GetFacilities,
  ChangeMode,
  updateFacility,
  SelectFacility,
  DeleteFacility
} from "src/app/store/actions/facility-redux.actions";
import {
  selectFacilitiesMapMode$,
  getCurrentFacility$
} from "src/app/store/selectors/facility-redux.selectors";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { MapModeEnum } from 'src/app/store/states/facility-redux.state';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-add-facility",
  templateUrl: "./add-facility.component.html",
  styleUrls: ["./add-facility.component.scss"]
})
export class AddFacilityReduxComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[];
  mapMode$ = this.store.select(selectFacilitiesMapMode$);
  mapModeString$ = this.store.select(selectFacilitiesMapMode$).subscribe(console.log);
  facility$ = this.store.select(getCurrentFacility$);

  mapMode: MapModeEnum;
  facility: FacilityRedux = {
    location: [null, null],
    _id: null,
    name: null,
    type: null
  };

  constructor(private store: Store<AppState>) {
    // get all facilities from the db
    this.store.dispatch(GetFacilities());
  }

  ngOnInit(): void {
    this.subscriptions$ = [
      this.facility$.subscribe(facility => {
        this.facility = facility
          ? { ...facility }
          : { location: [null, null], _id: null, name: null, type: null };
      }),
      this.mapMode$.subscribe(mapMode => {
        this.mapMode = mapMode
      })
    ];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s$ => s$.unsubscribe());
  }

  onSubmit(): void {
    const { _id, name, type, location } = this.facility;

    if (this.mapMode == MapModeEnum.CREATE_FACILITY) {
      this.store.dispatch(addFacility({ facility: { name, type, location } }));
    } else {
      this.store.dispatch(updateFacility({ facility: { _id, name, type, location } }))
    }
  }

  OnAddBtn(): void {
    this.store.dispatch(ChangeMode({ mode: MapModeEnum.CREATE_FACILITY }));
  }

  OnEditBtn(): void {
    this.store.dispatch(ChangeMode({ mode: MapModeEnum.EDIT_FACILITY }));
  }

  OnDeleteBtn(): void { 
    const { _id, name, type, location } = this.facility;

    this.store.dispatch(ChangeMode({mode : MapModeEnum.DELETE_FACILITY}))
    this.store.dispatch(DeleteFacility({ facility: { _id, name, type, location } }))
  }

  OnCancelBtn(): void {
    this.store.dispatch(ChangeMode({ mode: MapModeEnum.NONE }));
  }
}
