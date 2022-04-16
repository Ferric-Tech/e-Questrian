import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalanderComponent } from './pages/calander/calander.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calander', component: CalanderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
