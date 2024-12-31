import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { AlertComponent } from 'src/_components/alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './forms/login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './forms/register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { CustomHttpInterceptor } from 'src/_utilities/http-interceptor';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PasswordUpdateComponent } from './forms/password-update/password-update.component';
import { ImageUploadComponent } from './forms/image-upload/image-upload.component';
import { FooterComponent } from './footer/footer.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardComponent } from './cards/card/card.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './forms/dynamic-form-input/dynamic-form-input.component';
import { FormContainerComponent } from './forms/form-container/form-container.component';
import { EmployeeCardComponent } from './cards/employee-card/employee-card.component';
import { DetailTaskComponent } from './detail-page/detail-task/detail-task.component';
import { LinkButtonRendererComponent } from '../_renderers/link-button-renderer/link-button-renderer.component';
import { EditButtonRendererComponent } from '../_renderers/edit-button-renderer/edit-button-renderer.component';
import { DeleteButtonRendererComponent } from 'src/_renderers/delete-button-renderer/delete-button-renderer.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { ImagePreviewRendererComponent } from '../_renderers/image-preview-renderer/image-preview-renderer.component';
import { StaffCardComponent } from './cards/staff-card/staff-card.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { FacilityDetailComponent } from './facility-detail/facility-detail.component';
import { DivisionDetailComponent } from './division-detail/division-detail.component';
import { DetailMapComponent } from './facility-detail/detail-map/detail-map.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentUploadComponent } from './forms/document-upload/document-upload.component';
import { DocumentPreviewRendererComponent } from '../_renderers/document-preview-renderer/document-preview-renderer.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { RichTextInputComponent } from './forms/rich-text-input/rich-text-input.component';
import { NgxEditorModule } from 'ngx-editor';
import { HtmlSanitizerComponent } from '../_components/html-sanitizer/html-sanitizer.component';
import { ButtonComponent } from '../_components/button/button.component';
import { FormInputComponent } from './forms/form-input/form-input.component';
import { FileInputComponent } from './forms/file-input/file-input.component';
import { BooleanRendererComponent } from '../_renderers/boolean-renderer/boolean-renderer.component';
import { DataPageComponent } from './data/data-page/data-page.component';
import { ProjectFilterComponent } from './data/_filters/project-filter/project-filter.component';
import { FilterComponent } from './data/_filters/filter/filter.component';
import { DataEntryComponent } from './data/data-entry/data-entry.component';
import { ActivitiesPageComponent } from './data/activities-page/activities-page.component';
import { ActivityViewComponent } from './data/activity-view/activity-view.component';
import { GeometryWidgetComponent } from './forms/geometry-widget/geometry-widget.component';
import { ActivityEditRendererComponent } from 'src/_renderers/activity-edit-renderer/activity-edit-renderer.component';
import { ActivityEditComponent } from './data/activity-edit/activity-edit.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { LoadingSpinnerComponent } from '../_components/loading-spinner/loading-spinner.component';
import { DocumentInfoComponent } from './documents/document-info/document-info.component';
import { FacilityPopupComponent } from './facilities/facility-popup/facility-popup.component';
import { MapLegendComponent } from './ol-map/map-legend/map-legend.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
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
    LinkButtonRendererComponent,
    EditButtonRendererComponent,
    DeleteButtonRendererComponent,
    ImagePreviewComponent,
    ImagePreviewRendererComponent,
    StaffCardComponent,
    FacilitiesComponent,
    FacilityDetailComponent,
    DivisionDetailComponent,
    DetailMapComponent,
    DocumentsComponent,
    DocumentUploadComponent,
    DocumentPreviewRendererComponent,
    ModalConfirmComponent,
    RichTextInputComponent,
    HtmlSanitizerComponent,
    ButtonComponent,
    FormInputComponent,
    FileInputComponent,
    BooleanRendererComponent,
    DataPageComponent,
    ProjectFilterComponent,
    FilterComponent,
    DataEntryComponent,
    ActivitiesPageComponent,
    ActivityViewComponent,
    ActivityEditRendererComponent,
    GeometryWidgetComponent,
    ActivityEditComponent,
    OlMapComponent,
    LoadingSpinnerComponent,
    DocumentInfoComponent,
    FacilityPopupComponent,
    MapLegendComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule,
    NgxEditorModule,
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
