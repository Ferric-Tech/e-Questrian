import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  constructor(private http: HttpClient) {}

  sendPaymentReceipt() {
    console.log('We here now');
    const url = 'https://us-central1-e-questrian.cloudfunctions.net/sendMail';
    this.http.get(url).subscribe((response: any) => console.log(response));
  }
}
