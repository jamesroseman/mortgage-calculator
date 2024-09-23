import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {
  private monthlyPaymentSubject = new BehaviorSubject<number | null>(null);
  private loanToValueSubject = new BehaviorSubject<number | null>(null);
  private debtToIncomeSubject = new BehaviorSubject<number | null>(null);
  private repaymentPeriodSubject = new BehaviorSubject<number | null>(null);

  get monthlyPayment$(): Observable<number | null> {
    return this.monthlyPaymentSubject.asObservable();
  }

  get loanToValue$(): Observable<number | null> {
    return this.loanToValueSubject.asObservable();
  }

  get debtToIncome$(): Observable<number | null> {
    return this.debtToIncomeSubject.asObservable();
  }

  get repaymentPeriod$(): Observable<number | null> {
    return this.repaymentPeriodSubject.asObservable();
  }

  // Methods to update the values
  setMortgageData(monthlyPayment: number, loanToValue: number, debtToIncome: number, repaymentPeriod: number): void {
    this.monthlyPaymentSubject.next(monthlyPayment);
    this.loanToValueSubject.next(loanToValue);
    this.debtToIncomeSubject.next(debtToIncome);
    this.repaymentPeriodSubject.next(repaymentPeriod)
  }
}
