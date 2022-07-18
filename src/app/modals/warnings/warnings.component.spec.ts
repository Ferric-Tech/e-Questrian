import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningsModal } from './warnings.component';

describe('WarningsModal', () => {
  let component: WarningsModal;
  let fixture: ComponentFixture<WarningsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
