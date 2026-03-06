import {Routes} from '@angular/router';
import {Vacation} from './page/vacation/vacation';
import {Dashboard} from './page/dashboard/dashboard';
import {Salary} from './page/salary/salary.component';
import {Compare} from './page/compare/compare';


export const routes: Routes = [
  {path: 'salary', component: Salary},
  {path: 'holidays', component: Vacation},
  {path: 'compare', component: Compare},
  {path: '', component: Dashboard}
];
