import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { MapStateService } from '../../../services/map-state.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from "@ngrx/store";
import { Facility } from 'src/app/models/Facility';
import { AppState } from 'src/app/store/states/app.state';
import { addFacility, ClearErrorMessage, addFacilitySuccess, GetFacilities } from 'src/app/store/actions/facility.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectFacilityState } from 'src/app/store/selectors/facility.selectors';


@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent implements OnInit, OnDestroy {
  @ViewChild('locationX') locationX: ElementRef;
  @ViewChild('locationY') locationY: ElementRef;

  facility: Facility = new Facility();
  getState: Observable<any>;

  public point$: Observable<__esri.Graphic[]>
  public list: Subscription;
  public pMessage: any[] = [];
  public mapPoint = [0, 0];
  editmode = false;

  constructor(public renderer: Renderer2, private store: Store<AppState>, private msService: MapStateService, private _snackBar: MatSnackBar) {
    this.getState = this.store.select(selectFacilityState);

    // get all facilities from the db
    this.store.dispatch(new GetFacilities());

  }


  ngOnInit(): void {

    setTimeout(() => { this.editmode = false; }, 0) // by default submit is disabled

    this.getState.subscribe(state => {

      if (state.facility) {
        if (state.errorMessage) {
          this.showSnackBar(state.facility.errorMessage, "Failed");
          this.store.dispatch(new ClearErrorMessage);
        } else if (state.facility.getFacilities) {
          //console.log(state);
        } else if (state.facility.addFacility) {
          this.showSnackBar(state.facility.addFacility.message, state.facility.addFacility.status);
          this.store.dispatch(new addFacilitySuccess(state));
        }
      }
      // after new facility added. allow Submit to add more facilities.
      this.editmode = true;
    });



    this.point$ = this.msService.getPoint();
    this.list = this.point$.subscribe({
      next: x => {
        if (x.length) {
          this.mapPoint = this.findPointValue(x)
          this.locationX.nativeElement.value = this.mapPoint[0]; // Longtitude
          this.locationY.nativeElement.value = this.mapPoint[1]; // Latitude
          this.editmode = true;
        }
      },
      error: err => console.error('error in subscriber', err),
      complete: () => console.log('complete')
    })

  }

  ngOnDestroy() {
    this.msService.setMapOpsMode("");
    this.list.unsubscribe();
    this.point$ = null;
    this.pMessage = [];
    this.mapPoint = [0, 0];
    this.editmode = false;
  }

  onSubmit(): void {
    // disable allow untill the response callback
    this.editmode = false;

    const payload = {
      name: this.facility.name,
      type: this.facility.type,
      location: [this.locationX.nativeElement.value, this.locationY.nativeElement.value]
    };

    this.store.dispatch(new addFacility(payload));
  }

  OnAddBtn(): void {
    this.msService.setMapOpsMode("addFacility");
  }

  OnDeleteBtn(): void {
    this.msService.setMapOpsMode("deleteFacility");
  }

  findPointValue(point: any) {
    return [point[0].geometry.longitude, point[0].geometry.latitude];
  }

  showSnackBar(msg, stat) {
    this._snackBar.open(msg, stat, {
      duration: 5000
    });
  }

}
