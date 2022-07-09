import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInvoiceModal } from './generate-invoice.modal';

describe('GenerateInvoiceModal', () => {
  let component: GenerateInvoiceModal;
  let fixture: ComponentFixture<GenerateInvoiceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateInvoiceModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInvoiceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
