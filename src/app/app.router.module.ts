import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { JobComponent } from './pages/job/job.component';
import { UserComponent } from './pages/user/user.component';
import {LoginRouteGuard} from "./services/router.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', component: JobComponent , canActivate: [LoginRouteGuard]},
    { path: 'user', component: UserComponent , canActivate: [LoginRouteGuard]},
    { path: 'dashboard', component: AdminDashboardComponent , canActivate: [LoginRouteGuard] },
    { path: '**', redirectTo:'login', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
