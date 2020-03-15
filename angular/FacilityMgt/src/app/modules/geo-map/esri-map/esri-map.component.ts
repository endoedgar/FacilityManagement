import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { loadModules } from "esri-loader";
import { MapStateService } from '../../../services/map-state.service';
import { Subscription, Observable } from 'rxjs';
import { selectFacilityState } from 'src/app/store/selectors/facility.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.states';


@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit {

  public mapView: __esri.MapView;
  private sub: Subscription = new Subscription();
  getState: Observable<any>;

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private msService: MapStateService, private store: Store<AppState>) {
    this.getState = this.store.select(selectFacilityState);
   }

  // TODO : chenge it to async/await 
  public ngOnInit() {
    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic'
    ])
      .then(([Map, MapView, Graphic]) => {
        const map: __esri.Map = new Map({
          basemap: 'hybrid'
        });

        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-91.9672633, 41.01768],
          zoom: 18,
          map: map
        });

        this.mapView.when(
          () => {
            const points = this.msService.getPoint();
            console.log('first load', points);
            this.sub = points.subscribe(value => {
              if (value.length) {
                this.mapView.graphics.addMany(value);
                this.sub.unsubscribe(); // we only want this once
              }
            })
          },
          (err) => {
            console.error(err);
          }
        );

        this.mapView.on('click', (event: __esri.MapViewClickEvent) => {

          let url = null;
          let addGraphicFlag = false;
          if (this.msService.getMapOpsMode() == "addFacility") {
            this.mapView.graphics.removeAll();
            url = "../../../../assets/images/facility.png";
            addGraphicFlag = true;
          }

          const pointGraphic: __esri.Graphic = new Graphic({
            attributes: {
              time: new Date().getTime()
            },
            geometry: {
              type: 'point',
              longitude: event.mapPoint.longitude,
              latitude: event.mapPoint.latitude,
              spatialReference: event.mapPoint.spatialReference
            },
            symbol: {
              type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
              url: url,
              width: "40px",
              height: "40px"
            }
          });

          if (addGraphicFlag) {
            this.mapView.graphics.add(pointGraphic);
            this.msService.addPoint(pointGraphic);
            this.msService.setMapOpsMode("");
          }
        });

        this.getState.subscribe(state => {

          if (state.facility) {
            if (state.errorMessage) {
              // this.showSnackBar(state.facility.errorMessage, "Failed");
              // this.store.dispatch(new ClearErrorMessage);
            } else if (state.facility.getFacilities) {
              const url = "../../../../assets/images/facility.png";
              console.log(this.mapView)
              state.facility.getFacilities.data.map(point => {
                if (!point.location.length)return;

                const pointGraphic: __esri.Graphic = new Graphic({
                  attributes: {
                    time: new Date().getTime()
                  },
                  geometry: {
                    type: 'point',
                    longitude: point.location[0],
                    latitude: point.location[1],
                    spatialReference: this.mapView.spatialReference
                  },
                  symbol: {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: url,
                    width: "40px",
                    height: "40px"
                  }
                });
      
                  this.mapView.graphics.add(pointGraphic);
                  
              });
              console.log(state);
            } else if (state.facility.addFacility) {
              // this.showSnackBar(state.facility.addFacility.message, state.facility.addFacility.status);
              // this.store.dispatch(new addFacilitySuccess(state));
            }
          }
        });
        
      })
      .catch(err => {
        console.error(err);
      });
  }
}
