import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuScreen } from './menu.screen';

describe('MenuScreen', () => {
  let component: MenuScreen;
  let fixture: ComponentFixture<MenuScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MenuScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
