import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  {
    path: 'calendar',
    canActivate: [AuthGuardService],
    component: CalendarComponent,
  },
  {
    path: 'finances',
    canActivate: [AuthGuardService],
    component: FinancesComponent,
  },
  {
    path: 'clients',
    canActivate: [AuthGuardService],
    component: ClientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
