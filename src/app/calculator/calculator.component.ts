import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MortgageService } from '../mortgage.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.sass'
})
export class CalculatorComponent {
  calculatorForm: FormGroup;

  constructor(private fb: FormBuilder, private mortgageService: MortgageService) {
    this.calculatorForm = this.fb.group({
      borrowingAmount: ['', [Validators.required, Validators.min(0)]],
      purchasePrice: ['', [Validators.required, Validators.min(0)]],
      repaymentPeriod: ['', [Validators.required]],
      grossIncome: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  ngOnInit(): void {
    // Listen for form changes and calculate the monthly repayment amount.
    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculateResults();
    })
  }

  calculateResults(): void {
    const formValues = this.calculatorForm.value;

    const borrowingAmount = parseFloat(formValues.borrowingAmount);
    const purchasePrice = parseFloat(formValues.purchasePrice);
    const repaymentPeriod = parseFloat(formValues.repaymentPeriod);
    const grossIncome = parseFloat(formValues.grossIncome);
    const interestRate = parseFloat(formValues.interestRate);

    // If the form is valid, calculate the monthly repayment amount.
    if (this.calculatorForm.valid) {
      const monthlyPayment = this.calculateMonthlyRepayment(borrowingAmount, interestRate, repaymentPeriod);
      const loanToValue = (borrowingAmount / purchasePrice) * 100;
      const annualPayment = monthlyPayment * 12;
      const debtToIncome = (annualPayment / grossIncome) * 100;

      this.mortgageService.setMortgageData(monthlyPayment, loanToValue, debtToIncome, repaymentPeriod);
    }
  }

  calculateMonthlyRepayment(borrowingAmount: number, interestRate: number, repaymentPeriod: number): number {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = repaymentPeriod * 12;
    return (
      borrowingAmount * monthlyInterestRate / 
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    );
  }
}
