import { Pipe, PipeTransform } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Pipe({
  name: 'gravatarUrl'
})
export class GravatarUrlPipe implements PipeTransform {

  transform(email: string): string {
    return `//www.gravatar.com/avatar/${ Md5.hashStr((email ? email : "").trim().toLowerCase())}?d=monsterid`;
  }

}
