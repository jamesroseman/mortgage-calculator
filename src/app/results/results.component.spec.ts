import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResultsComponent } from './results.component';
import { MortgageService } from '../mortgage.service';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mortgageServiceSpy: jasmine.SpyObj<MortgageService>;

  beforeEach(async () => {
    mortgageServiceSpy = jasmine.createSpyObj('MortgageService', [], {
      monthlyPayment$: of(4213), 
      loanToValue$: of(89.9), 
      debtToIncome$: of(4.5),  
      repaymentPeriod$: of(30) 
    });

    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        { provide: MortgageService, useValue: mortgageServiceSpy } // Provide the mock service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding and subscriptions
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the monthly payment from the service', () => {
    expect(component.monthlyPayment).toBe(4213); // The component should have subscribed to the monthlyPayment$ observable
  });

  it('should receive the loan to value from the service', () => {
    expect(component.loanToValue).toBe(89.9); // The component should have subscribed to the loanToValue$ observable
  });

  it('should receive the debt to income ratio from the service', () => {
    expect(component.debtToIncome).toBe(4.5); // The component should have subscribed to the debtToIncome$ observable
  });

  it('should receive the repayment period from the service', () => {
    expect(component.repaymentPeriod).toBe(30); // The component should have subscribed to the repaymentPeriod$ observable
  });
});
