import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToDate'
})
export class IdToDatePipe implements PipeTransform {

  transform(value: string): Date {
    const timestamp = value.toString().substring(0,8);
    return new Date( parseInt( timestamp, 16 ) * 1000 );
  }

}
