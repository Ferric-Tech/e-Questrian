import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralScreen } from './general.screen';

describe('GeneralScreen', () => {
  let component: GeneralScreen;
  let fixture: ComponentFixture<GeneralScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
