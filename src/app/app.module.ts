import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NavbarComponent } from './common-components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NewAppointmentComponent } from './modals/appointment-details/appointment-detail.modal';
import { ClientDetailsComponent } from './modals/client-details/client-details.component';
import { PaymentsComponent } from './modals/payments/payments.component';
import { MenuPageComponent } from './common-components/pages/menu-page/menu-page.component';
import { FinancialDocListComponent } from './common-components/pages/financial-doc-list/financial-doc-list.component';
import { GeneralPageComponent } from './common-components/pages/general-page/general-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CalendarComponent,
    FinancesComponent,
    ClientsComponent,
    NewAppointmentComponent,
    ClientDetailsComponent,
    PaymentsComponent,
    MenuPageComponent,
    FinancialDocListComponent,
    GeneralPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
