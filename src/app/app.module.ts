import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { AlertComponent } from 'src/_components/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { CustomHttpInterceptor } from 'src/_helpers/http-interceptor';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentUpdateComponent } from './department-update/department-update.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { ListPageComponent } from './list-page/list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    DivisionsComponent,
    DepartmentComponent,
    DepartmentUpdateComponent,
    DepartmentDetailComponent,
    ListPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    // services with @Injectable({ providedIn: 'root' }) don't need to be listed here. They are singleton, available throughout app.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
