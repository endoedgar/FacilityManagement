import { Injectable } from "@angular/core";
import { MapStore } from "../map-store.class";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapStateService extends MapStore<any[]> {
  getPoints(): Observable<__esri.Graphic[]> {
    return this.getState();
  }

  addPoint(point: __esri.Graphic) {
    const c = this.getValue();

    if (typeof c !== "undefined") {
      this.setState([...this.getValue(), point]);
    } else {
      this.setState([point]);
    }
  }
  constructor() {
    // Important ;-) MapStore needs an initial value of any empty []
    super([]);
  }
}
