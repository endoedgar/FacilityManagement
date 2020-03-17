import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { loadModules } from "esri-loader";
import { MapStateService } from '../../../services/map-state.service';
import { Subscription, Observable } from 'rxjs';
import { selectFacilityState } from 'src/app/store/selectors/facility.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ThrowStmt } from '@angular/compiler';
import { addFacilitySuccess } from 'src/app/store/actions/facility.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deleteInspectionSuccess } from 'src/app/store/actions/inspection.actions';


@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit {


  public mapView: __esri.MapView;
  private sub: Subscription = new Subscription();
  getState: Observable<any>;
  dialogRef;
  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private msService: MapStateService, private store: Store<AppState>) {
    this.getState = this.store.select(selectFacilityState);

  }

  OpenDialog(graphic) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
  }

  // TODO : chenge it to async/await 
  public ngOnInit() {

    const addFacilityImgURL = "../../../../assets/images/facility.png";


    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
    ])
      .then(([Map, MapView, Graphic, GraphicsLayer]) => {
        const map: __esri.Map = new Map({
          basemap: 'hybrid'
        });

        var Glayer = new GraphicsLayer({
          graphics: []
        });


        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-91.9672633, 41.01768],
          zoom: 18,
          map: map
        });

        map.add(Glayer);

        this.mapView.when(
          () => {
            const points = this.msService.getPoints();
            console.log('first load', points);
            this.sub = points.subscribe(value => {
              if (value.length) {
                //this.mapView.graphics.addMany(value);
                Glayer.graphics.addMany(value);
                this.sub.unsubscribe(); // we only want this once
              }
            })
          },
          (err) => {
            console.error(err);
          }
        );

        this.mapView.on('click', async (event: __esri.MapViewClickEvent) => {

          if (this.msService.getMapOpsMode() == "addFacility") {

            let mPoint = {
              location: [event.mapPoint.longitude, event.mapPoint.latitude]
            };
            const attr = {
              name: "sdf",
              type: "sdf"
            }
            const pointGraphic: __esri.Graphic = generateGraphic(mPoint, attr, addFacilityImgURL);

            //this.mapView.graphics.add(pointGraphic);
            Glayer.graphics.add(pointGraphic);
            this.msService.addPoint(pointGraphic);
            this.msService.setMapOpsMode("");

          } else if (this.msService.getMapOpsMode() == "deleteFacility") {

            let graphic: __esri.Graphic;
            const response = await this.mapView.hitTest(event);

            if (response.results.length) {
              graphic = response.results.filter(function (result) {
                return result.graphic.layer === Glayer;
              })[0].graphic;
            }

            this.OpenDialog(graphic);

            this.dialogRef.afterClosed().subscribe(result => {
              if (result) {
                Glayer.graphics.remove(graphic) // TODO : remove it after deleted on db
                //this.msService.delPoint(graphic);
              }
            });

            this.msService.setMapOpsMode("");
          }
        });

        this.getState.subscribe(state => {

          if (state.facility) {
            if (state.facility.getFacilities) {

              if (state.facility.getFacilities.status == "success") {
                let mPoint = null;
                state.facility.getFacilities.data.map(point => {
                  if (!point.location.length) return; // ignore points without coordinates
                  const attr = {
                    id: point._id,
                    name: point.name,
                    type: point.type
                  }
                  Glayer.graphics.add(generateGraphic(point, attr, addFacilityImgURL));

                });
              } else {
                this.showSnackBar("Unexpected Error !", state.facility.getFacilities.status);
              }

            } else if (state.facility.addFacility) {
              console.log(state.facility);
              const point = state.facility.addFacility.data;

              const attr = {
                id: point._id,
                name: point.name,
                type: point.type
              }
              Glayer.graphics.add(generateGraphic(point, attr, addFacilityImgURL));

              this.showSnackBar(state.facility.addFacility.message, state.facility.addFacility.status);
              this.store.dispatch(new addFacilitySuccess(state));
            
            } else if (state.facility.deleteFacility) {
              console.log(state)
              if (state.facility.deleteFacility.status == "success") {
                this.showSnackBar(state.facility.deleteFacility.message, state.facility.deleteFacility.status);
                //this.store.dispatch(new DeleteFacilitySuccess(state));
              }
            }
          }
        });



        function generateGraphic(point, attr, url) {
          const pointGraphic: __esri.Graphic = new Graphic({
            attributes: attr,
            geometry: {
              type: 'point',
              longitude: point.location[0],
              latitude: point.location[1],
              spatialReference: 3857 //TODO: add it to config
            },
            symbol: {
              type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
              url: url,
              width: "40px",
              height: "40px"
            }
          });

          return pointGraphic;
        }

       
        
      })
      .catch(err => {
        console.error(err);
      });


  }
  
  showSnackBar(msg, stat) {
    this._snackBar.open(msg, stat, {
      duration: 3000
    });
  }

}
