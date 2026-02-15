import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CollapsibleSection} from '../../component/collapsible-section/collapsible-section';
import {Dropdown} from '../../component/dropdown/dropdown';
import {DictionaryValue} from '../../shared/model/dictionary.value';
import {HttpClient} from '@angular/common/http';
import {DictionaryTypeId} from '../../shared/model/constant';
import {Switch} from '../../component/switch/switch';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-compare',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CollapsibleSection,
    Dropdown,
    Switch,
    NgClass
  ],
  templateUrl: './compare.html',
  styleUrl: './compare.css'
})
export class Compare implements OnInit {
  protected currencyOptions: DictionaryValue[] = [];
  protected salaryPeriodOptions: DictionaryValue[] = [];
  protected salaryTypeOptions: DictionaryValue[] = [];
  protected workLocations: DictionaryValue[] = [];

  protected offer: FormGroup = new FormGroup({
    compensationForm: new FormGroup({
      salaryTypeCompanyA: new FormControl('', Validators.required),
      salaryTypeCompanyB: new FormControl('', Validators.required),
      currencyA: new FormControl('', Validators.required),
      currencyB: new FormControl('', Validators.required),
      salaryPeriodA: new FormControl('', Validators.required),
      salaryPeriodB: new FormControl('', Validators.required),
      salaryA: new FormControl<number | null>(null, Validators.required),
      salaryB: new FormControl<number | null>(null, Validators.required),
      bonusesA: new FormControl('', Validators.required),
      bonusesB: new FormControl('', Validators.required),
      mealTicketA: new FormControl('', Validators.required),
      mealTicketB: new FormControl('', Validators.required),
      rsuA: new FormControl('', Validators.required),
      rsuB: new FormControl('', Validators.required),
      vestingPeriodA: new FormControl('', Validators.required),
      vestingPeriodB: new FormControl('', Validators.required),
      nasdaqTickerA: new FormControl('', Validators.required),
      nasdaqTickerB: new FormControl('', Validators.required),
    }),
    benefitsForm: new FormGroup({
      healthInsuranceA: new FormControl(false, Validators.required),
      healthInsuranceB: new FormControl(false, Validators.required),
      floatingDaysA: new FormControl(false, Validators.required),
      floatingDaysB: new FormControl(false, Validators.required),
      ptoDaysA: new FormControl(21, Validators.required),
      ptoDaysB: new FormControl(21, Validators.required),
      wellnessBenefitA: new FormControl(0, Validators.required),
      wellnessBenefitB: new FormControl(0, Validators.required),
    }),
    workArrangementForm: new FormGroup({
      locationA: new FormControl('', Validators.required),
      locationB: new FormControl('', Validators.required),
      commuteTimeA: new FormControl('', Validators.required),
      commuteTimeB: new FormControl('', Validators.required),
      workHoursFlexibilityA: new FormControl('', Validators.required),
      workHoursFlexibilityB: new FormControl('', Validators.required),
      overtimeExpectationsA: new FormControl(false, Validators.required),
      overtimeExpectationsB: new FormControl(false, Validators.required),
    }),
  });


  constructor(private httpClient: HttpClient) {
  }


  ngOnInit() {
    this.httpClient.get<DictionaryValue[][]>('./dropdown.json').subscribe({
      next: data => {
        this.currencyOptions = data[DictionaryTypeId.CURRENCY]
        this.salaryPeriodOptions = data[DictionaryTypeId.FREQUENCY]
        this.salaryTypeOptions = data[DictionaryTypeId.SALARY_TYPE]
        this.workLocations = data[DictionaryTypeId.LOCATIONS]
        console.log(data);
      }
    })

  }

  protected print() {
    console.log(this.offer.getRawValue());
  }

  protected workLocationChange(event: any, field: string) {
    console.log('Event!');
    console.log(event);
    const companyLetter = field.charAt(field.length - 1);
    if (event.value == 3) {
      let workArrangementForm: FormGroup = this.offer.get('workArrangementForm') as FormGroup;
      workArrangementForm?.get(`commuteTime${companyLetter}`)?.setValue(0);
      workArrangementForm?.get(`commuteTime${companyLetter}`)?.disable();
    } else {
      let workArrangementForm: FormGroup = this.offer.get('workArrangementForm') as FormGroup;
      workArrangementForm?.get(`commuteTime${companyLetter}`)?.setValue(0);
      workArrangementForm?.get(`commuteTime${companyLetter}`)?.enable();
    }

  }
}
