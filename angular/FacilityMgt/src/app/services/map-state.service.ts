import { Injectable } from "@angular/core";
import { MapStore } from "../map-store.class";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { DeleteFacility } from '../store/actions/facility.actions';

@Injectable({
  providedIn: "root"
})
export class MapStateService extends MapStore<any[]> {
  currentMapOpsMode: string = "";
  private BASE_URL = "http://localhost:4000/api/v1"; // TODO: add it to config file

  constructor(private http: HttpClient, private store: Store<AppState>) {
    super([]);
  }

  getPoints(): Observable<__esri.Graphic[]> {
    return this.getState();
  }

  addPoint(point: __esri.Graphic) {
    const current = this.getValue();
    if (typeof current !== "undefined") {
      this.setState([...this.getValue(), point]);
    } else {
      this.setState([point]);
    }
  }

  delPoint(point: __esri.Graphic) {

    if (!point.attributes.id) return;

    
    const payload = {
      id: point.attributes.id
    };

    this.store.dispatch(new DeleteFacility(payload));
    this.setState([point]);
  }

  /**
   * currentMapOpsMode flag is to control map component behaviours,
   * since its runs over once instane and designed by singleton design pattern;
   * because it heavy and may affect the App performance.
   * 
   * @yousefaliq 
   *  */
  getMapOpsMode(): string {
    return this.currentMapOpsMode;
  }

  setMapOpsMode(mode: string) {
    this.currentMapOpsMode = mode;
  }

  public getFacilities(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/facilities/`);
  }

}
