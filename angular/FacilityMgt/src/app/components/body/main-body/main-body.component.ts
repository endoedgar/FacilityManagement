import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent  {

 // Set our map properties
 mapCenter = [-91.9672633, 41.01768];
 basemapType = 'satellite';
 mapZoomLevel = 18;

 // See app.component.html
 mapLoadedEvent(status: boolean) {
   console.log('The map loaded: ' + status);
 }

}
