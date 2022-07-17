import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancesPage } from './finances.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('FinancesPage', () => {
  let component: FinancesPage;
  let fixture: ComponentFixture<FinancesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      declarations: [FinancesPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
