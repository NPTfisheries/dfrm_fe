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
import { FacilitiesComponent } from './facilities/facilities.component';
import { FacilityDetailComponent } from './facility-detail/facility-detail.component';
import { DivisionDetailComponent } from './division-detail/division-detail.component';
import { DocumentsComponent } from './documents/documents.component';
import { DataEntryComponent } from './data/data-entry/data-entry.component';
import { DataQueryComponent } from './data/data-query/data-query.component';
import { ActivitiesPageComponent } from './data/activities-page/activities-page.component';
import { ActivityViewComponent } from './data/activity-view/activity-view.component';
import { ActivityEditComponent } from './data/activity-edit/activity-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'documents', component: DocumentsComponent},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},


    // data
    { path: 'activities', component: ActivitiesPageComponent, canActivate: [AuthGuard]},
    { path: 'activities/:id', component: ActivityViewComponent, canActivate: [AuthGuard]},
    { path: 'activities/:id/edit', component: ActivityEditComponent, canActivate: [AuthGuard]},
    { path: 'data-entry', component: DataEntryComponent, canActivate: [AuthGuard]},
    { path: 'data-query', component: DataQueryComponent, canActivate: [AuthGuard]},


    // public-facing card pages
    { path: 'divisions', component: CardPageComponent },
    { path: 'projects', component: CardPageComponent },
    { path: 'facilities', component: FacilitiesComponent },
    
    // lists
    { path: 'department-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'division-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'facility-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'project-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'task-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'user-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'image-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'location-list', component: ListPageComponent, canActivate: [AuthGuard]},
    { path: 'instrument-list', component: ListPageComponent, canActivate: [AuthGuard]},


    // wildcard for detail pages
    { path: 'departments/:slug', component: DetailPageComponent},
    { path: 'divisions/:slug', component: DivisionDetailComponent},
    { path: 'facilities/:slug', component: FacilityDetailComponent},
    { path: 'projects/:slug', component: DetailPageComponent},
    { path: 'users/:id', component: ProfileComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }