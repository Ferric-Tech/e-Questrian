import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessResultsScreen } from './process-results.screen';

describe('ProcessResultsScreen', () => {
  let component: ProcessResultsScreen;
  let fixture: ComponentFixture<ProcessResultsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessResultsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessResultsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
