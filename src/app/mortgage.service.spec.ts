import { TestBed } from '@angular/core/testing';
import { MortgageService } from './mortgage.service';

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial values as null', (done: DoneFn) => {
    service.monthlyPayment$.subscribe((value) => {
      expect(value).toBeNull();
    });

    service.loanToValue$.subscribe((value) => {
      expect(value).toBeNull();
    });

    service.debtToIncome$.subscribe((value) => {
      expect(value).toBeNull();
    });

    done();
  });

  it('should update monthly payment correctly', (done: DoneFn) => {
    const expectedMonthlyPayment = 4213;

    service.setMortgageData(expectedMonthlyPayment, 80, 3.5, 12);

    service.monthlyPayment$.subscribe((value) => {
      expect(value).toBe(expectedMonthlyPayment);
      done();
    });
  });

  it('should update loan-to-value correctly', (done: DoneFn) => {
    const expectedLoanToValue = 80;

    service.setMortgageData(4213, expectedLoanToValue, 3.5, 12);

    service.loanToValue$.subscribe((value) => {
      expect(value).toBe(expectedLoanToValue);
      done();
    });
  });

  it('should update debt-to-income ratio correctly', (done: DoneFn) => {
    const expectedDebtToIncome = 3.5;

    service.setMortgageData(4213, 80, expectedDebtToIncome, 12);

    service.debtToIncome$.subscribe((value) => {
      expect(value).toBe(expectedDebtToIncome);
      done();
    });
  });

  it('should update repayment period ratio correctly', (done: DoneFn) => {
    const expectedRepaymentPeriod = 12;

    service.setMortgageData(4213, 80, 3.5, expectedRepaymentPeriod);

    service.repaymentPeriod$.subscribe((value) => {
      expect(value).toBe(expectedRepaymentPeriod);
      done();
    });
  });

  it('should update all values correctly', (done: DoneFn) => {
    const expectedMonthlyPayment = 4213;
    const expectedLoanToValue = 80;
    const expectedDebtToIncome = 3.5;
    const expectedRepaymentPeriod = 12;

    service.setMortgageData(expectedMonthlyPayment, expectedLoanToValue, expectedDebtToIncome, expectedRepaymentPeriod);

    service.monthlyPayment$.subscribe((monthlyPayment) => {
      expect(monthlyPayment).toBe(expectedMonthlyPayment);
    });

    service.loanToValue$.subscribe((loanToValue) => {
      expect(loanToValue).toBe(expectedLoanToValue);
    });

    service.debtToIncome$.subscribe((debtToIncome) => {
      expect(debtToIncome).toBe(expectedDebtToIncome);
    });

    service.repaymentPeriod$.subscribe((repaymentPeriod) => {
      expect(repaymentPeriod).toBe(expectedRepaymentPeriod);
    });

    done();
  });
});
