import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QueryDementiaComponent } from './pages/query-dementia/query-dementia.component';
import { OriginalDatasetComponent } from './pages/original-dataset/original-dataset.component';
import { UploadDatasetComponent } from './pages/upload-dataset/upload-dataset.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'consultar-definicion', component: QueryDementiaComponent },
  { path: 'dataset-original', component: OriginalDatasetComponent },
  { path: 'subir-dataset', component: UploadDatasetComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
