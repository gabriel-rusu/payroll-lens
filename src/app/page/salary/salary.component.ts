import { Component } from '@angular/core';
import {Calculator} from "../../component/calculator/calculator";
import {SalaryBreakdown} from "../../component/salary-breakdown/salary-breakdown";
import {Income} from '../../shared/model/income.model';

@Component({
  selector: 'app-salary',
    imports: [
        Calculator,
        SalaryBreakdown
    ],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class Salary {
  income?: Income;
}
