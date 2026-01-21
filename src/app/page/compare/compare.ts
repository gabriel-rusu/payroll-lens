import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-compare',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './compare.html',
  styleUrl: './compare.css'
})
export class Compare {
  protected defaultIncome: any;

}
