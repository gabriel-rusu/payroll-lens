import {Component, input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-salary-breakdown',
  imports: [],
  templateUrl: './salary-breakdown.component.html',
  styleUrl: './salary-breakdown.component.css'
})
export class SalaryBreakdownComponent implements OnInit {
  currency = input<string>('RON');
  taxes: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    console.log("Salary breakdown");
    this.httpClient.get("./taxes.json").subscribe({
        next: (res: any) => {
          console.log("Taxes");
          console.log(res);
          this.taxes = res;
        }
      }
    );

  }


}
