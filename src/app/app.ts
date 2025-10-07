import {Component} from '@angular/core';
import {Calculator} from './component/calculator/calculator';
import {SalaryBreakdown} from './component/salary-breakdown/salary-breakdown';
import {Income} from './shared/model/income.model';

@Component({
  selector: 'app-root',
  imports: [Calculator, SalaryBreakdown],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    income?: Income;}
