import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { NavbarComponent } from './common-components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NewAppointmentComponent } from './modals/appointment-details/appointment-detail.modal';
import { ClientDetailsComponent } from './modals/client-details/client-details.component';
import { PaymentsComponent } from './modals/payments/payments.component';
import { MenuPageComponent } from './screens/menu-page/menu-page.component';
import { FinancialDocListComponent } from './screens/financial-doc-list/financial-doc-list.component';
import { GeneralPageComponent } from './screens/general-page/general-page.component';
import { DocViewScreen } from './screens/doc-view/doc-view.screen';
import { WarningsComponent } from './modals/warnings/warnings.component';
import { GenerateInvoiceModal } from './modals/generate-invoice/generate-invoice.modal';
import { GenerateStatementModal } from './modals/generate-statement/generate-statement.modal';
import { ProcessResultsComponent } from './screens/process-results/process-results.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignInModal } from './modals/sign-in/sign-in.modal';

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
    DocViewScreen,
    WarningsComponent,
    GenerateInvoiceModal,
    GenerateStatementModal,
    ProcessResultsComponent,
    SignInComponent,
    SignInModal,
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
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
