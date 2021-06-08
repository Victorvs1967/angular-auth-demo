import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MokBackendInterceptor } from './mock-backend/mock-backend.interceptor';

export const AUTHENTICATION_CONFIG = { authEndpoint: '/users/authenticate', initialPage: 'home' };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    AuthenticationModule.forRoot(AUTHENTICATION_CONFIG),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MokBackendInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
