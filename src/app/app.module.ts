import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { NavbarComponent } from './common-components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NewAppointmentComponent } from './pages/calendar/new-appointment/new-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CalendarComponent,
    FinancesComponent,
    ClientsComponent,
    NewAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
