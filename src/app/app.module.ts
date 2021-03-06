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

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { FinancesPage } from './pages/finances/finances.page';
import { ClientsPage } from './pages/clients/clients.page';
import { NewAppointmentModal } from './modals/appointment-details/appointment-detail.modal';
import { ClientDetailsModal } from './modals/client-details/client-details.modal';
import { PaymentsModal } from './modals/payments/payments.modal';
import { MenuScreen } from './screens/menu/menu.screen';
import { FinancialDocListScreen } from './screens/financial-doc-list/financial-doc-list.screen';
import { GeneralScreen } from './screens/general/general.screen';
import { DocViewScreen } from './screens/financial-doc-view/financial-doc-view.screen';
import { WarningsModal } from './modals/warnings/warnings.component';
import { GenerateInvoiceModal } from './modals/generate-invoice/generate-invoice.modal';
import { GenerateStatementModal } from './modals/generate-statement/generate-statement.modal';
import { ProcessResultsScreen } from './screens/process-results/process-results.screen';
import { SignInPage } from './pages/sign-in/sign-in.component';
import { SignInModal } from './modals/sign-in/sign-in.modal';
import { GeneralItemsListScreen } from './screens/general-items-list/general-items-list.screen';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    CalendarPage,
    FinancesPage,
    ClientsPage,
    NewAppointmentModal,
    ClientDetailsModal,
    PaymentsModal,
    MenuScreen,
    FinancialDocListScreen,
    GeneralScreen,
    DocViewScreen,
    WarningsModal,
    GenerateInvoiceModal,
    GenerateStatementModal,
    ProcessResultsScreen,
    SignInPage,
    SignInModal,
    GeneralItemsListScreen,
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
