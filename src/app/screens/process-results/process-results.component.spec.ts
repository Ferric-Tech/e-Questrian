import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessResultsComponent } from './process-results.component';

describe('ProcessResultsComponent', () => {
  let component: ProcessResultsComponent;
  let fixture: ComponentFixture<ProcessResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
