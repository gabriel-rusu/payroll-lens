import { Component, OnInit } from '@angular/core';
import {SideNavBar} from '../../component/side-nav-bar/side-nav-bar';
import { MobileNavBar } from '../../component/mobile-nav-bar/mobile-nav-bar';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { FormsModule } from '@angular/forms';
import { OfferForm } from '../../component/offer-profile/offer.form';
import { OfferOverview } from '../../model/offer.overview';
import { Overview } from '../../component/overview/overview';

@Component({
  selector: 'app-dashboard',
  imports: [OfferProfile, FormsModule, Overview],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  protected position: OfferOverview | undefined;
  protected editable: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('currentPosition')) {
      this.position = JSON.parse(<string>localStorage.getItem('currentPosition'));
    }
  }

  protected saveDetails() {
    console.log(this.position);
    this.editable = false;
    localStorage.setItem('currentPosition', JSON.stringify(this.position));
  }
}
