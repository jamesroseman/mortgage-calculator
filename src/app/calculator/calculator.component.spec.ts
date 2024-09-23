import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MortgageService } from '../mortgage.service';
import { CalculatorComponent } from './calculator.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mortgageService: MortgageService;

  beforeEach(async () => {
    const mortgageServiceSpy = jasmine.createSpyObj('MortgageService', ['setMortgageData']);

    await TestBed.configureTestingModule({
      imports: [CalculatorComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MortgageService, useValue: mortgageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    mortgageService = TestBed.inject(MortgageService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    const form = component.calculatorForm;
    expect(form).toBeDefined();
    expect(form.controls['borrowingAmount'].value).toBe('');
    expect(form.controls['purchasePrice'].value).toBe('');
    expect(form.controls['repaymentPeriod'].value).toBe('');
    expect(form.controls['grossIncome'].value).toBe('');
    expect(form.controls['interestRate'].value).toBe('');
  });

  it('should mark form as invalid if fields are empty', () => {
    const form = component.calculatorForm;
    expect(form.valid).toBeFalsy();
  });

  it('should mark form as valid when all fields are filled with valid data', () => {
    const form = component.calculatorForm;

    form.controls['borrowingAmount'].setValue('100000');
    form.controls['purchasePrice'].setValue('200000');
    form.controls['repaymentPeriod'].setValue('30');
    form.controls['grossIncome'].setValue('50000');
    form.controls['interestRate'].setValue('5');

    expect(form.valid).toBeTruthy();
  });

  it('should call calculateMonthlyRepayment correctly', () => {
    const monthlyPayment = component.calculateMonthlyRepayment(100000, 5, 30);
    expect(monthlyPayment).toBeCloseTo(536.82, 2);
  });

  it('should calculate results and call MortgageService when form is valid', () => {
    const form = component.calculatorForm;

    // Set valid values
    form.controls['borrowingAmount'].setValue('100000');
    form.controls['purchasePrice'].setValue('200000');
    form.controls['repaymentPeriod'].setValue('30');
    form.controls['grossIncome'].setValue('50000');
    form.controls['interestRate'].setValue('5');
    fixture.detectChanges();
    component.calculateResults();

    expect(mortgageService.setMortgageData).toHaveBeenCalledWith(
      jasmine.any(Number),
      50,
      jasmine.any(Number),
      30
    );
  });

  it('should not call MortgageService when form is invalid', () => {
    const form = component.calculatorForm;
    component.calculateResults();
    expect(mortgageService.setMortgageData).not.toHaveBeenCalled();
  });
});
