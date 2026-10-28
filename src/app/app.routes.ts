import { Routes } from '@angular/router';
import {OfferComparison} from './pages/offer-comparison/offer-comparison';
import {SalaryCalculator} from './pages/salary-calculator/salary-calculator';
import {VacationPlanner} from './pages/vacation-planner/vacation-planner';

export const routes: Routes = [
  {
    path: 'offer-comparison',
    title: 'Payroll Lens | Offer Comparison',
    component: OfferComparison,
  },
  {
    path: 'salary-calculator',
    title: 'Payroll Lens | Salary Calculator',
    component: SalaryCalculator,
  },
  {
    path: 'vacation-planner',
    title: 'Payroll Lens | Vacation Planner',
    component: VacationPlanner,
  },
  { path: '', redirectTo: 'salary-calculator', pathMatch: 'full' },
];
