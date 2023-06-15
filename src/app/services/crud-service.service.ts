import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  eliminarArchivoDataset(): Observable<any> {
    return this.http.get(URL_SERVER + APIS_URL.EliminarArchivoDataset);
  }

  obtenerFormato(tipo:string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/vnd.github.v3+json');
    if (tipo == "CSV") {
      return this.http.get(
        'https://api.github.com/repos/jpillajo/backend-nlp-dementia/contents/assets/Formato.csv',
        {
          headers: headers,
        }
      );
    } else {
      return this.http.get(
        'https://api.github.com/repos/jpillajo/backend-nlp-dementia/contents/assets/Formato.xlsx',
        {
          headers: headers,
        }
      );
    }
  }
}
