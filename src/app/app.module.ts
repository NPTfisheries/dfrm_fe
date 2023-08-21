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

import { CustomHttpInterceptor } from 'src/_helpers/http-interceptor';
import { ProfileUpdateComponent } from './forms/profile-update/profile-update.component';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AddEditPageComponent } from './add-edit-page/add-edit-page.component';
import { PasswordUpdateComponent } from './forms/password-update/password-update.component';
import { ImageUploadComponent } from './forms/image-upload/image-upload.component';
import { CustomSelectComponent } from '../_inputs/custom-select/custom-select.component';
import { MultiSelectComponent } from '../_inputs/multi-select/multi-select.component';
import { FooterComponent } from './footer/footer.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardComponent } from './card/card.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from '../_forms/dynamic-form-input/dynamic-form-input.component';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { DivisionFormComponent } from './forms/division-form/division-form.component';
import { DepartmentFormComponent } from './forms/department-form/department-form.component';

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
    AddEditPageComponent,
    PasswordUpdateComponent,
    ImageUploadComponent,
    CustomSelectComponent,
    MultiSelectComponent,
    FooterComponent,
    CardPageComponent,
    CardComponent,
    DynamicFormComponent,
    DynamicFormInputComponent,
    ProjectFormComponent,
    DivisionFormComponent,
    DepartmentFormComponent,
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
