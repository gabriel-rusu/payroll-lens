import { Component } from '@angular/core';
import {SideNavBar} from '../../component/side-nav-bar/side-nav-bar';

@Component({
  selector: 'app-vacation-planner',
  imports: [
    SideNavBar
  ],
  templateUrl: './vacation-planner.html',
  styleUrl: './vacation-planner.css',
})
export class VacationPlanner {}
