import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  transform(value: number, rate:number): number {
    let result = (value + (value*rate/100)).toFixed(2);
    return parseFloat(result);
  }
}