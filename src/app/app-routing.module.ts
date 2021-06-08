import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';
import { AuthenticationGuard } from 'src/app/authentication/guards/authentication.guard';
import { RoleGuard } from 'src/app/authentication/guards/role.guard';
import { ROLE } from './authentication/models/role.enum';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: ROLE.ADMIN } },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: ROLE.USER } },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
