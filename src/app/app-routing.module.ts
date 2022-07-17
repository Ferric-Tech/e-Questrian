import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ClientsPage } from './pages/clients/clients.page';
import { FinancesPage } from './pages/finances/finances.page';
import { HomePage } from './pages/home/home.page';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomePage },
  {
    path: 'calendar',
    canActivate: [AuthGuardService],
    component: CalendarPage,
  },
  {
    path: 'finances',
    canActivate: [AuthGuardService],
    component: FinancesPage,
  },
  {
    path: 'clients',
    canActivate: [AuthGuardService],
    component: ClientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
