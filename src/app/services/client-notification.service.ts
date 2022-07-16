import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  async getAuthHeaders() {
    const user: User = (await this.afAuth.user
      .pipe(first())
      .toPromise()) as User;
    const token: string = await user.getIdToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
    });
  }

  async sendPaymentReceipt() {
    const url = 'https://us-central1-e-questrian.cloudfunctions.net/auth';
    const headers = await this.getAuthHeaders();
    this.http.post(url, '', { headers }).subscribe((res) => {
      console.log(res);
    });
  }
}
