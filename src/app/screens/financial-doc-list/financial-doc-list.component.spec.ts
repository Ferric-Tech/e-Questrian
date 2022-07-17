import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDocListComponent } from './financial-doc-list.component';

describe('FinancialDocListComponent', () => {
  let component: FinancialDocListComponent;
  let fixture: ComponentFixture<FinancialDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialDocListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
