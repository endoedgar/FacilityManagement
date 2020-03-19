import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";
import {
  selectFacilityState$,
  getCurrentFacility$,
  selectFacilitiesMapMode$
} from "src/app/store/selectors/facility-redux.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import {
  selectFacilitiesLoading$,
  selectAllFacilities$
} from "src/app/store/selectors/facility-redux.selectors";
import { IdToDatePipe } from "src/app/pipes/id-to-date.pipe";
import { combineLatest, fromEvent, concat, Subscription } from "rxjs";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { withLatestFrom, map } from "rxjs/operators";
import {
  SelectFacility,
  AddNewFacilityObjectOnMap
} from "src/app/store/actions/facility-redux.actions";
import { MapModeEnum } from "src/app/store/states/facility-redux.state";

@Component({
  selector: "app-esri-map-redux",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit {
  loading$ = this.store.select(selectFacilitiesLoading$);
  mapMode$ = this.store.select(selectFacilitiesMapMode$);
  facility$ = this.store.select(getCurrentFacility$);
  mapModeString$ = this.store.select(selectFacilitiesMapMode$).subscribe(console.log);


  public mapView: __esri.MapView;
  getState = this.store.select(selectFacilityState$);
  dialogRef;

  Map: typeof import("esri/Map");
  MapView: typeof import("esri/views/MapView");
  Graphic: any;
  GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
  Color: typeof import("esri/Color");
  subscriptions$: Subscription[];
  mapMode: MapModeEnum;
  facility: FacilityRedux = {
    location: [null, null],
    _id: null,
    name: null,
    type: null
  };


  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild("mapViewNode") private mapViewEl: ElementRef;

  static readonly addFacilityImgURL = "../../../../assets/images/facility.png";
  static readonly addFacilityTempImgURL = "../../../../assets/images/facilityTemp.png";

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private idToDatePipe: IdToDatePipe
  ) { }



  public async initModules(): Promise<any> {
    // use esri-loader to load JSAPI modules
    return new Promise(async (resolve, reject) => {
      try {
        const [
          Map,
          MapView,
          Graphic,
          GraphicsLayer,
          Color
        ] = await loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/Graphic",
          "esri/layers/GraphicsLayer",
          "esri/Color",
          "esri/widgets/Popup",
          "esri/PopupTemplate"
        ]);

        this.Map = Map;
        this.MapView = MapView;
        this.Graphic = Graphic;
        this.GraphicsLayer = GraphicsLayer;
        this.Color = Color;

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public async ngOnInit() {
    await this.initModules();

    const Glayer = new this.GraphicsLayer({
      graphics: []
    });

    this.mapView = new this.MapView({
      container: this.mapViewEl.nativeElement,
      center: [-91.9672633, 41.01768],
      zoom: 18,
      map: new this.Map({
        basemap: "hybrid"
      })
    });

    this.mapView.map.add(Glayer);

    await this.mapView.when();

    // Each time something happens on Facility State including map mode
    combineLatest(
      this.store.select(selectAllFacilities$),
      this.store.select(getCurrentFacility$),
      this.mapMode$
    ).subscribe(([facilities, selectedFacility, mapMode]) => {

      // disable info template 
      if (mapMode == MapModeEnum.CREATE_FACILITY) {
        this.mapView.popup.autoOpenEnabled = false;
      } else {
        this.mapView.popup.autoOpenEnabled = true;
      }

      // hide info-template after delete ...
      this.mapView.popup.close();

      // TODO : chenge it to hide display insted of remove all graphics
      Glayer.graphics.removeAll();
      facilities
        .filter(
          facility =>
            facility.location.length &&
            (mapMode != MapModeEnum.EDIT_FACILITY ||
              (mapMode == MapModeEnum.EDIT_FACILITY &&
                selectedFacility == facility))
        )
        .map(facility => {
          Glayer.graphics.add(
            this.generateGraphic(
              facility,
              selectedFacility?._id == facility?._id,
              EsriMapComponent.addFacilityImgURL
            )
          );
        });
    });

    // Every single click on Map
    fromEvent(this.mapViewEl.nativeElement, "click")
      .pipe(withLatestFrom(this.mapMode$))
      .subscribe(async ([event, mapMode]: [any, MapModeEnum]) => {


        const screenPoint = {
          x: event.layerX,
          y: event.layerY
        };

        // using self pattern ;-)
        const self = this;

        switch (mapMode) {
          case MapModeEnum.CREATE_FACILITY:
            const { latitude, longitude } = this.mapView.toMap(event);
            this.store.dispatch(
              AddNewFacilityObjectOnMap({
                facility: {
                  _id: "NEW_FACILITY",
                  location: [longitude, latitude],
                  name: "NEW FACILITY",
                  type: "NEW FACILITY"
                }
              })
            );
            break;
          case MapModeEnum.NONE:
          case MapModeEnum.SELECT_FACILITY:
            const response = await this.mapView.hitTest(screenPoint);
            if (response.results.length) {
              const facility: FacilityRedux =
                response.results[0].graphic.attributes;

              self.store.dispatch(SelectFacility({ facility }));
            }
            break;
        }
      });

    this.subscriptions$ = [
      this.facility$.subscribe(facility => {

        if (facility) {
          // this.mapView.zoom = 13;  // Sets the zoom LOD to 13
          const obj = { target: facility.location, center: facility.location, scale: this.mapView.scale , zoom: this.mapView.zoom };
          //const ops = {  duration: 1000, easing: "easeInOutQuad"};
          this.mapView.goTo(obj);  // Sets the center point of the view at a specified lon/lat
         }
      }),
      this.mapMode$.subscribe(mapMode => {
        this.mapMode = mapMode
      })
    ];
  }

  generateGraphic(facility: FacilityRedux, selected: boolean, imgUrl: string) {
    const drivenDate = this.idToDatePipe.transform(facility._id);
    const enrichedFacility = { ...facility, "date": drivenDate }

    const pointGraphic: __esri.Graphic = new this.Graphic({
      attributes: enrichedFacility,
      geometry: {
        type: "point",
        longitude: enrichedFacility.location[0],
        latitude: enrichedFacility.location[1],
        spatialReference: 3857 //TODO: add it to config
      },
      symbol: {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: imgUrl,
        angle: selected ? 20 : 0,
        width: selected ? "40px" : "40px",
        height: selected ? "40px" : "40px"
      },
      popupTemplate: {
        title: "{name}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "type",
                label: "Facility Type"
              },
              {
                fieldName: "date",
                label: "Date"
              }
            ]
          }
        ]
      }
    });

    return pointGraphic;
  }

  OpenDialog(graphic) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
  }



}
