import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MapStateService } from '../../services/map-state.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
 
  coordx: FormControl;
  coordy: FormControl;
  public points$: Observable<__esri.Graphic[]>
  public list: Subscription;
  public pMessage: any[] = [];

  
  constructor(public fb: FormBuilder, private msService: MapStateService, private changeDetect: ChangeDetectorRef) {
    this.coordx = fb.control({value: 'my val', disabled: false});
    this.coordy = fb.control({value: 'my val1', disabled: false});
  }


  // If you want, you could also use this function to parse out the value
  // and call this function from the component *cdkVirtualFor="let point of findPointValue(points$)"
  public findPointValue(product: any) {
    let finalValue: object;
    if(product.source.value.length){
      finalValue = product.source.value.map((val) => {
        return [val.geometry.latitude + ", " + val.geometry.longitude]
      });
    }

    return finalValue;
  }


  ngOnInit(): void {
    console.log("onInit")
    // deactivate change detection component and children
    this.changeDetect.detach();     
    this.points$ = this.msService.getPoints();
    this.list = this.points$.subscribe({
      next: x => { 
        let finalValue: any[];
        if (x.length) {
          finalValue = x.map((val:any) => {
            return val.geometry.latitude + ", " + val.geometry.longitude;
          });

          // TODO: remove this testing code ...
          const cdX = x.map((val:any) => {
            return val.geometry.longitude;
          });
          const cdY = x.map((val:any) => {
            return val.geometry.latitude;
          });
          this.coordx = this.fb.control({value: cdX, disabled: false});
          this.coordy = this.fb.control({value: cdY, disabled: false});
  
        }
        this.pMessage = finalValue;
        this.changeDetect.detectChanges();
      },
      error: err => console.error('error in subscriber', err),
      complete: () => console.log('complete')
    })
  }

  ngOnDestroy(){
    this.list.unsubscribe();
  }

}
