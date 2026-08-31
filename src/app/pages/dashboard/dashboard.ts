import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SideNavBar } from '../../component/side-nav-bar/side-nav-bar';
import { MobileNavBar } from '../../component/mobile-nav-bar/mobile-nav-bar';
import { OfferProfile } from '../../component/offer-profile/offer-profile';
import { FormsModule } from '@angular/forms';
import { OfferForm } from '../../component/offer-profile/offer.form';
import { OfferOverview } from '../../model/offer.overview';
import { Overview } from '../../component/overview/overview';
import { OutOfOfficeSlot } from '../../component/out-of-office-slot/out-of-office-slot';
import { OutOfOfficeInterval } from '../../model/out-of-office.interval';
import { WorkdayCounterService } from '../../service/workday.service';
import { LocalizationService } from '../../service/localization.service';
import { format, getDay, isAfter, parse } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  imports: [OfferProfile, FormsModule, Overview, OutOfOfficeSlot],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  protected position: OfferOverview | undefined;
  protected editable: boolean = false;
  protected oooIntervals: WritableSignal<OutOfOfficeInterval[]> = signal([]);

  constructor(
    private workdayService: WorkdayCounterService,
    private localizationService: LocalizationService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentPosition')) {
      this.position = JSON.parse(<string>localStorage.getItem('currentPosition'));
    } else {
      this.editable = true;
    }

    this.workdayService.legalDaysOff(new Date().getFullYear(), 'RO').subscribe((daysOff) => {
      let nextDaysOff = [];
      for (let dayOff of daysOff) {
        if (isAfter(parse(dayOff.date, 'yyyy-MM-dd', new Date()), new Date())) {
          nextDaysOff.push(dayOff);
        }
      }

      this.oooIntervals.set(nextDaysOff.map((dayOff) => {
        return {
          date: parse(dayOff.date, 'yyyy-MM-dd', new Date()),
          numberOfDays: 1,
          name: dayOff.name,
          getDay: () => format(parse(dayOff.date, 'yyyy-MM-dd', new Date()), 'dd'),
          getMonth: () => format(parse(dayOff.date, 'yyyy-MM-dd', new Date()), 'MMM'),
        };
      }));
      console.log(nextDaysOff);
    });
  }

  protected saveDetails() {
    console.log(this.position);
    this.editable = false;
    localStorage.setItem('currentPosition', JSON.stringify(this.position));
  }
}
