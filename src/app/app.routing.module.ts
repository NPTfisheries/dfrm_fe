import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from 'src/_helpers/auth-guard';
import { DivisionsComponent } from './divisions/divisions.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent}, //, canActivate: [AuthGuard]},

    // plural is for the public-facing card pages
    // { path: 'departments', component: DepartmentsComponent},
    { path: 'divisions', component: DivisionsComponent},
    // { path: 'projects', component: ProjectsComponent},
    
    // singular is for the list page, similar to django return for API
    // { path: 'division', component: DivisionComponent}, //, canActivate: [AuthGuard]},
    // { path: 'department', component: DepartmentComponent}, //, canActivate: [AuthGuard]},

    { path: 'department', component: ListPageComponent}, //, canActivate: [AuthGuard]},
    { path: 'project', component: ListPageComponent}, //, canActivate: [AuthGuard]},
    { path: 'user', component: ListPageComponent}, //, canActivate: [AuthGuard]},

    // wildcard for detail pages
    { path: 'department/:slug', component: DepartmentDetailComponent}, //, canActivate: [AuthGuard]},
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }