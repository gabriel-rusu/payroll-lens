import {Routes} from '@angular/router';
import {Vacation} from './page/vacation/vacation';
import {Dashboard} from './page/dashboard/dashboard';
import {Salary} from './page/salary/salary.component';


export const routes: Routes = [
  {path: 'salary', component: Salary},
  {path: 'vacation', component: Vacation},
  {path: '', component: Dashboard}
];
