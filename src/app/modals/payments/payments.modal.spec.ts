import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsModal } from './payments.modal';

describe('PaymentsModal', () => {
  let component: PaymentsModal;
  let fixture: ComponentFixture<PaymentsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
