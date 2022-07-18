import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsModal } from './client-details.modal';

describe('ClientDetailsModal', () => {
  let component: ClientDetailsModal;
  let fixture: ComponentFixture<ClientDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientDetailsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
