import { Injectable } from "@angular/core";
import { MapStore } from "../map-store.class";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class MapStateService extends MapStore<any[]> {
  currentMapOpsMode:string = ""; 
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {
    super([]);
  }

  getPoint(): Observable<__esri.Graphic[]> {
    return this.getState();
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

  public getFacilities(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/facilities/`);
  }

}
