import { Component } from '@angular/core';
import {SideNavBar} from '../../component/side-nav-bar/side-nav-bar';

@Component({
  selector: 'app-salary-calculator',
  imports: [
    SideNavBar
  ],
  templateUrl: './salary-calculator.html',
  styleUrl: './salary-calculator.css',
})
export class SalaryCalculator {}
