import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientNotificationService } from './client-notification.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ClientNotificationService', () => {
  let service: ClientNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    });
    service = TestBed.inject(ClientNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
