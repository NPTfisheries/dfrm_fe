import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { AlertComponent } from 'src/_components/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './forms/login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './forms/register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { CustomHttpInterceptor } from 'src/_utilities/http-interceptor';
import { ProfileUpdateComponent } from './forms/profile-update/profile-update.component';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PasswordUpdateComponent } from './forms/password-update/password-update.component';
import { ImageUploadComponent } from './forms/image-upload/image-upload.component';
import { FooterComponent } from './footer/footer.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardComponent } from './card/card.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './forms/dynamic-form-input/dynamic-form-input.component';
import { FormContainerComponent } from './forms/form-container/form-container.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { DetailTaskComponent } from './detail-page/detail-task/detail-task.component';
import { DetailSubprojectComponent } from './detail-page/detail-subproject/detail-subproject.component';

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
    ListPageComponent,
    DetailPageComponent,
    PasswordUpdateComponent,
    ImageUploadComponent,
    FooterComponent,
    CardPageComponent,
    CardComponent,
    DynamicFormComponent,
    DynamicFormInputComponent,
    FormContainerComponent,
    EmployeeCardComponent,
    DetailTaskComponent,
    DetailSubprojectComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
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
