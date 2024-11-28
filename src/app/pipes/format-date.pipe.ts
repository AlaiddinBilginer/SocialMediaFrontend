import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  private datePipe = inject(DatePipe);

  transform(value: Date, format: string = 'dd MMM yyyy'): string | null {
    return this.datePipe.transform(value, format, '', 'tr-TR');
  }

}
