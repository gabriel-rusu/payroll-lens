import { Component } from '@angular/core';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {SalaryBreakdownComponent} from './components/salary-breakdown/salary-breakdown.component';

@Component({
  selector: 'app-root',
  imports: [
    CalculatorComponent,
    SalaryBreakdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'salary-calculator';
}
