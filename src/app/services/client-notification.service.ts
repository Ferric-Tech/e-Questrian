import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { PaymentDetails } from '../interfaces/payments.interface';
import { Clients } from '../interfaces/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  clients = {} as Clients;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  async getAuthHeaders() {
    const user: User = (await this.afAuth.user
      .pipe(first())
      .toPromise()) as User;
    const token: string = await user.getIdToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async sendPaymentReceipt(payment: PaymentDetails) {
    this.getClients();
    const url = 'https://us-central1-e-questrian.cloudfunctions.net/email';
    const body = {
      from: 'e-Questrian Notifications <e-questrianonline@outlook.com>',
      to: this.clients[payment.client].email,
      subject: 'Payment receipt',
      html:
        `
          <!DOCTYPE html>
          <html>
          
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title></title>
          </head>
          
          <body style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">
              <table style="width: 100%; background-color: rgb(100, 235, 245); border-collapse: collapse; border: solid rgb(100, 235, 245);">
                  <tbody>
                      <tr>
                          <td style="width: 100%; border: solid rgb(100, 235, 245);">
                              <div style="text-align: center;"><span style="font-size: 36px; font-family: Tahoma, Geneva, sans-serif;">Thank you for your payment</span></div>
                          </td>
                      </tr>
                      <tr>
                          <td style="width: 100%; border: solid rgb(100, 235, 245); background-color: rgb(255, 255, 255);"><br><br>
                              <table style="width: 63%; margin-right: calc(17%); margin-left: calc(20%);">
                                  <tbody>
                                      <tr>
                                          <td colspan="2" style="width: 100%; text-align: center;"><br><span style="font-size: 20px; font-family: Tahoma, Geneva, sans-serif;"><strong>Payment details</strong></span><br><br></td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Received by</td>
                                          <td style="width: 66.785%; text-align: center;">Ruben Ferreira</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Amount</td>
                                          <td style="width: 66.785%; text-align: center;">R` +
        payment.amount +
        `.00</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Date</td>
                                          <td style="width: 66.785%; text-align: center;">` +
        payment.date +
        `</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Time</td>
                                          <td style="width: 66.785%; text-align: center;">` +
        Date.now() +
        `</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Payment method</td>
                                          <td style="width: 66.785%; text-align: center;">Cash</td>
                                      </tr>
                                  </tbody>
                              </table><br>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <p><br></p>
          </body>
          
          </html>
      `,
    };
    const options = { headers: await this.getAuthHeaders() };
    this.http.post(url, body, options).subscribe((res) => {
      console.log(res);
    });
  }

  private getClients() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
