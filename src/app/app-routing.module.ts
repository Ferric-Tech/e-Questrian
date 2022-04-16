import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'finances', component: FinancesComponent },
  { path: 'clients', component: ClientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
