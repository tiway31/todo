import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const maxSize = 50;
    if (args[0] === undefined) {
      if (value.length > maxSize) {
        return value.substring(0, maxSize) + '...';
      } else {
        return value;
      }
    } else {
      if (value.length > args) {
        return value.substring(0, args) + '...';
      } else {
        return value;
      }
    }
  }

}
