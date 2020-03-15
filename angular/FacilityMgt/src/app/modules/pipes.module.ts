import { IdToDatePipe } from 'src/app/pipes/id-to-date.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ 
    IdToDatePipe
  ],
  exports: [
    IdToDatePipe
  ]
})
export class ApplicationPipesModule {}