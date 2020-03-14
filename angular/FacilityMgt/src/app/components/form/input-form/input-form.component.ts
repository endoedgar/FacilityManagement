import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapStateService } from '../../../services/map-state.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from "@ngrx/store";
import { Facility } from 'src/app/models/Facility';
import { AppState, selectFacilityState } from 'src/app/store/app.states';
import { addFacility, ClearErrorMessage } from 'src/app/store/actions/facility.actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  @ViewChild('locationX') locationX: ElementRef;
  @ViewChild('locationY') locationY: ElementRef;


  facility: Facility = new Facility();
  getState: Observable<any>;

  public points$: Observable<__esri.Graphic[]>
  public list: Subscription;
  public pMessage: any[] = [];
  public mapPoint = [0, 0];

  constructor(private store: Store<AppState>, private msService: MapStateService, private _snackBar: MatSnackBar) {
    this.getState = this.store.select(selectFacilityState);
  }

  ngOnInit(): void {

    this.getState.subscribe(state => {
      console.log(state);
      if (state.facility) {
        if (state.errorMessage) {
          this._snackBar.open(state.facility.errorMessage, "Failed", {
            duration: 5000
          });
          this.store.dispatch(new ClearErrorMessage);
        }else if (state.facility){
          this._snackBar.open(state.facility.result.message, state.facility.result.status, {
            duration: 5000
          });
          this.store.dispatch(new ClearErrorMessage);
        }
      }
    });

    this.points$ = this.msService.getPoints();
    this.list = this.points$.subscribe({
      next: x => {
        if (x.length) {
          this.mapPoint = this.findPointValue(x)
          this.locationX.nativeElement.value = this.mapPoint[0]; // Longtitude
          this.locationY.nativeElement.value = this.mapPoint[1]; // Latitude
        }
      },
      error: err => console.error('error in subscriber', err),
      complete: () => console.log('complete')
    })
  }

  ngOnDestroy() {
    this.list.unsubscribe();
  }

  onSubmit(): void {
    const payload = {
      name: this.facility.name,
      type: this.facility.type,
      location : [this.locationX.nativeElement.value,this.locationY.nativeElement.value]
    };

    this.store.dispatch(new addFacility(payload));
  }

  public findPointValue(point: any) {
    return [point[0].geometry.longitude, point[0].geometry.latitude];
  }

}
