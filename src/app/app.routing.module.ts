import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from 'src/_utilities/auth-guard';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CardPageComponent } from './card-page/card-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    // { path: 'image', component: ImageUploadComponent, canActivate: [AuthGuard]},


    // plural is for the public-facing card pages
    { path: 'departments', component: CardPageComponent },
    { path: 'divisions', component: CardPageComponent },
    { path: 'projects', component: CardPageComponent },
    
    // singular is for the list page, similar to django return for API
    { path: 'department', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'division', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'project', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'subproject', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'task', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'users', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'image', component: ListPageComponent, canActivate: [AuthGuard]},

    // wildcard for detail pages
    { path: 'department/:slug', component: DetailPageComponent},
    { path: 'division/:slug', component: DetailPageComponent},
    { path: 'project/:slug', component: DetailPageComponent},
    { path: 'users/:id', component: DetailPageComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }