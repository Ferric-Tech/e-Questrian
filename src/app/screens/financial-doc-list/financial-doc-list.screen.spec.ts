import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialDocListScreen } from './financial-doc-list.screen';

describe('FinancialDocListScreen', () => {
  let component: FinancialDocListScreen;
  let fixture: ComponentFixture<FinancialDocListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FinancialDocListScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDocListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
