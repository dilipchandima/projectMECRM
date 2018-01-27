import { NoteService } from './services/note.service';
import { JobService } from './services/job.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { JobComponent } from './pages/job/job.component';
import { UserComponent } from './pages/user/user.component';

import { AppRoutingModule } from './app.router.module';

import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {LoginRouteGuard} from './services/router.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    JobComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    JobService,
    NoteService,
    LoginRouteGuard
  ],
  bootstrap:
    [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      AdminDashboardComponent,
      JobComponent,
      UserComponent
    ]
})
export class AppModule { }
