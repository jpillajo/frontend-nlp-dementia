import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';

//PAGES
import { HomeComponent } from './pages/home/home.component';
import { QueryDementiaComponent } from './pages/query-dementia/query-dementia.component';
import { OriginalDatasetComponent } from './pages/original-dataset/original-dataset.component';
import { UploadDatasetComponent } from './pages/upload-dataset/upload-dataset.component';
import { UtilService } from './services/util.service';
import { MessageService } from 'primeng/api';
import { CrudServiceService } from './services/crud-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QueryDementiaComponent,
    OriginalDatasetComponent,
    UploadDatasetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    PanelModule,
    BrowserAnimationsModule,
    SplitterModule,
    CardModule,
    InputTextareaModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    DropdownModule,
    FileUploadModule,
    ProgressBarModule,
    TabMenuModule,
    PaginatorModule,
    SplitButtonModule
  ],
  providers: [UtilService, MessageService, CrudServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
