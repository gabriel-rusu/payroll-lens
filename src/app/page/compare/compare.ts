import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CollapsibleSection} from '../../component/collapsible-section/collapsible-section';
import {Dropdown} from '../../component/dropdown/dropdown';
import {DictionaryValue} from '../../shared/model/dictionary.value';
import {HttpClient} from '@angular/common/http';
import {DictionaryTypeId} from '../../shared/model/constant';

@Component({
  selector: 'app-compare',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CollapsibleSection,
    Dropdown
  ],
  templateUrl: './compare.html',
  styleUrl: './compare.css'
})
export class Compare implements OnInit {
  protected currencyOptions:DictionaryValue[] = [];
  protected salaryPeriodOptions: DictionaryValue[]=[];
  protected salaryTypeOptions: DictionaryValue[]=[];

  protected compensationForm: FormGroup = new FormGroup({
    salaryTypeCompanyA: new FormControl('', Validators.required),
    salaryTypeCompanyB: new FormControl('', Validators.required),
    currencyA: new FormControl('', Validators.required),
    currencyB: new FormControl('', Validators.required),
    salaryPeriodA: new FormControl('', Validators.required),
    salaryPeriodB: new FormControl('', Validators.required),
  });
  protected benefitsForm: FormGroup = new FormGroup({});


  constructor(private httpClient: HttpClient) {
  }


  protected eval($event: Event) {
    console.log(this.compensationForm.getRawValue());
  }

  ngOnInit() {
    this.httpClient.get<DictionaryValue[][]>('./dropdown.json').subscribe({
      next: data => {
        this.currencyOptions = data[DictionaryTypeId.CURRENCY]
        this.salaryPeriodOptions = data[DictionaryTypeId.FREQUENCY]
        this.salaryTypeOptions = data[DictionaryTypeId.SALARY_TYPE]

        console.log(data);
      }
    })

  }
}
