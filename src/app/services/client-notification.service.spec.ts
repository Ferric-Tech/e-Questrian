import { TestBed } from '@angular/core/testing';

import { ClientNotificationService } from './client-notification.service';

describe('ClientNotificationService', () => {
  let service: ClientNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
