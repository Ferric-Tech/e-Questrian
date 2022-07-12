import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientDetail } from '../interfaces/clients.interface';
import { PaymentDetails } from '../interfaces/payments.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  constructor(private http: HttpClient) {}

  sendPaymentReceipt() {
    let url = 'https://us-central1-e-questrian.cloudfunctions.net/httpEmail';
    let params: URLSearchParams = new URLSearchParams();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    params.set('to', 'rubenf85@gmail.com');
    params.set('from', 'hello@angularfirebase.com');
    params.set('content', 'This is an email');

    return this.http
      .post(url, params, httpOptions)
      .toPromise()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
