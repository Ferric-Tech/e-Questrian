import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralItemsListScreen } from './general-items-list.screen';

describe('GeneralItemsListScreen', () => {
  let component: GeneralItemsListScreen;
  let fixture: ComponentFixture<GeneralItemsListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralItemsListScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralItemsListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
