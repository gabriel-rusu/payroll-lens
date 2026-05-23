import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavBar } from './component/side-nav-bar/side-nav-bar';
import { MobileNavBar } from './component/mobile-nav-bar/mobile-nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavBar, MobileNavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('payroll-lens');
}
