import { Component } from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-vacation',
  imports: [
    MatCalendar,
    MatCard
  ],
  templateUrl: './vacation.html',
  styleUrl: './vacation.css'
})
export class Vacation {
  protected selected: any;

}
