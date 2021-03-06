import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocViewScreen } from './financial-doc-view.screen';

describe('DocViewScreen', () => {
  let component: DocViewScreen;
  let fixture: ComponentFixture<DocViewScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocViewScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
