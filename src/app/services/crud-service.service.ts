import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../env';
import { IComboBox, IDocumento } from '../models/Documento';
import { APIS_URL } from '../config/apis';

@Injectable({
  providedIn: 'root',
})
export class CrudServiceService {
  constructor(private http: HttpClient) {}

  consultarDefinicion(dto: IDocumento): Observable<any> {
    return this.http.post(URL_SERVER + APIS_URL.ConsultarDefinicion, dto);
  }

  obtenerDataset(dto: IComboBox): Observable<any> {
    return this.http.post(URL_SERVER + APIS_URL.ObtenerDataset, dto);
  }

  subirArchivoCSV(file: any): Observable<any> {
    return this.http.post(URL_SERVER + APIS_URL.SubirDataset, file);
  }

  consultarDefinicionDataset(dto: IComboBox): Observable<any> {
    return this.http.post(URL_SERVER + APIS_URL.ConsultarSimilitudDataset, dto);
  }
}
