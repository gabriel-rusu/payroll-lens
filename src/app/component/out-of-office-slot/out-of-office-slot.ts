import { Component, input } from '@angular/core';
import { OutOfOfficeInterval } from '../../model/out-of-office.interval';
import { format } from 'date-fns';



@Component({
  selector: 'app-out-of-office-slot',
  imports: [],
  templateUrl: './out-of-office-slot.html',
  styleUrl: './out-of-office-slot.css',
})
export class OutOfOfficeSlot {
  date = input.required<OutOfOfficeInterval>();
  protected readonly format = format;
}
