import { Routes } from '@angular/router';
import {Calculator} from './component/calculator/calculator';
import {Vacation} from './page/vacation/vacation';
import {Dashboard} from './page/dashboard/dashboard';


export const routes: Routes = [
  {path: '/salary', component: Calculator},
  {path: '/vacation', component: Vacation},
  {path: '/', component: Dashboard}
];
