import { IdToDatePipe } from 'src/app/pipes/id-to-date.pipe';
import { NgModule } from '@angular/core';
import { GravatarUrlPipe } from '../pipes/gravatar-url.pipe';

@NgModule({
  declarations: [ 
    IdToDatePipe,
    GravatarUrlPipe
  ],
  exports: [
    IdToDatePipe,
    GravatarUrlPipe
  ]
})
export class ApplicationPipesModule {}