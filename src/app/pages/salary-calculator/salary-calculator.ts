import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { SideNavBar } from '../../component/side-nav-bar/side-nav-bar';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DecimalPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Tax } from '../../model/tax';
import { CalculatorFactory } from '../../strategy/calculator.factory';
import { IncomeType, TaxType } from '../../util/constants';
import { Income } from '../../model/income';
import { IncomeBreakdown } from '../../model/income-breakdown';
import { ExchangeService } from '../../service/exchange.service';
import { ExchangeRate } from '../../model/exchange.rate';

@Component({
  selector: 'app-salary-calculator',
  imports: [FormsModule, NgClass, DecimalPipe],
  templateUrl: './salary-calculator.html',
  styleUrl: './salary-calculator.css',
  standalone: true,
})
export class SalaryCalculator implements OnInit {
  protected currentMode = signal(IncomeType.NET);
  protected frequency = signal('Monthly');
  protected currency = signal('RON');
  protected prevCurrency = signal('RON');
  protected income = signal(20000);
  protected hasCalculatedTaxes = signal(false);
  protected taxes: WritableSignal<Tax[]> = signal([]);
  protected incomeBreakdown = computed(() => {
    let calculator = CalculatorFactory.get(this.currentMode());
    return calculator.computeTaxRates(new Income('', '', this.income(), ''), this.taxes());
  });
  private employeeTaxes: Tax[] = [];
  private employerTaxes: Tax[] = [];
  private employerTotal: number = 0;
  private exchangeRates: ExchangeRate[] = [];

  constructor(private httpClient: HttpClient, private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.httpClient
      .get<Tax[]>('./taxes.json')
      .pipe(map((res) => res.map((tax) => Tax.from(tax))))
      .subscribe({
        next: (taxes: Tax[]) => {
          this.taxes.set(taxes);
          this.compute(taxes);
        },
      });
    this.exchangeService.exchangeRates('RON', ['EUR', 'USD']).subscribe({
      next: (exchange) => {
        console.log('exchange', exchange);
        this.exchangeRates = exchange;
      },
    });
  }

  private compute(taxes: Tax[]) {
    this.employeeTaxes = this.incomeBreakdown().taxRates.filter(
      (tax) => tax.type == TaxType.EMPLOYEE,
    );
    this.employerTaxes = this.incomeBreakdown().taxRates.filter(
      (tax) => tax.type == TaxType.EMPLOYER,
    );
    this.employerTotal =
      this.employerTaxes
        .map((tax) => tax.value)
        .reduce((total: number, current: number) => total + current) +
      this.incomeBreakdown().grossIncome;
  }

  protected selectedModeStyling(mode: string): string {
    if (this.currentMode() == mode) {
      return 'flex-1 py-3 px-4 rounded-md bg-surface-container-lowest text-on-surface font-bold text-sm shadow-sm transition-all';
    } else {
      return 'flex-1 py-3 px-4 rounded-md text-on-surface-variant font-medium text-sm hover:text-on-surface transition-all';
    }
  }

  onInput(event: Event) {
    const raw = (event.target as HTMLInputElement).value.replace(/,/g, '');
    this.income.set(Number(raw));
  }

  formatted(income: number) {
    return income.toLocaleString('en-US');
  }

  protected computeSalary() {
    this.compute(this.taxes());
    this.hasCalculatedTaxes.set(true);
  }

  protected readonly IncomeType = IncomeType;

  protected changeFreq() {
    if (this.frequency() == 'Annually') {
      this.income.update((currentIncome) => {
        return currentIncome * 12;
      });
    } else {
      this.income.update((currentIncome) => currentIncome / 12);
    }
  }

  protected changeCurrency() {
    let idx = this.exchangeRates.findIndex(rate => rate.quote == this.decode(this.currency()))
      this.income.update(currentIncome => this.exchangeRates[idx].rate * currentIncome);

    this.exchangeService.exchangeRates(this.decode(this.currency()), ['EUR', 'USD', 'RON'].filter(currency => currency != this.decode(this.currency()))).subscribe({
      next: (exchange) => {
        console.log('exchange', exchange);
        this.exchangeRates = exchange;
      },
    });
    }

  private decode(s: string) {
    return s == '€' ? 'EUR' : s == '$' ? 'USD' : 'RON';
  }
}
