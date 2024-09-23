import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MortgageService } from '../mortgage.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {
  monthlyPayment: number | null = null;
  loanToValue: number | null = null;
  debtToIncome: number | null = null;
  repaymentPeriod: number | null = null;

  constructor(private mortgageService: MortgageService) {}

  ngOnInit(): void {
    this.mortgageService.monthlyPayment$.subscribe((payment) => {
      this.monthlyPayment = payment;
    });

    this.mortgageService.loanToValue$.subscribe((ltv) => {
      this.loanToValue = ltv;
    });

    this.mortgageService.debtToIncome$.subscribe((dti) => {
      this.debtToIncome = dti;
    });

    this.mortgageService.repaymentPeriod$.subscribe((period) => {
      this.repaymentPeriod = period;
    });
  }
}
