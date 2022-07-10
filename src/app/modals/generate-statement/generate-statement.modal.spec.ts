import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStatementModal } from './generate-statement.modal';

describe('GenerateInvoiceModal', () => {
  let component: GenerateStatementModal;
  let fixture: ComponentFixture<GenerateStatementModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateStatementModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateStatementModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
