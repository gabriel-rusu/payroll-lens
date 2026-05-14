import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav-bar.html',
  styleUrl: './mobile-nav-bar.css',
  standalone: true,
})
export class MobileNavBar {}
