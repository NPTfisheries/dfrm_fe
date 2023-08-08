import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from 'src/_helpers/auth-guard';
import { DivisionsComponent } from './divisions/divisions.component';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'divisions', component: DivisionsComponent},
    { path: 'department-list', component: ListPageComponent}, //, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent}, //, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }