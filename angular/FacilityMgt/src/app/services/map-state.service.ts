import { Injectable } from "@angular/core";
import { MapStore } from "../map-store.class";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapStateService extends MapStore<any[]> {
   currentMapOpsMode:string = ""; 

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

  /**
   * currentMapOpsMode flag is to control map component behaviours,
   * since its runs over once instane and designed by singleton design pattern;
   * because it heavy and may affect the App performance.
   * 
   * @yousefaliq 
   *  */ 
  getMapOpsMode() : string{
    return this.currentMapOpsMode;
  }

  setMapOpsMode(mode : string){
    this.currentMapOpsMode = mode;
  }

  constructor() {
    // Important ;-) MapStore needs an initial value of any empty []
    super([]);
  }
}
