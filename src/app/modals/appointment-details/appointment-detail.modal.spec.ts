import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointmentModal } from './appointment-detail.modal';

describe('NewAppointmentModal', () => {
  let component: NewAppointmentModal;
  let fixture: ComponentFixture<NewAppointmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAppointmentModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppointmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
