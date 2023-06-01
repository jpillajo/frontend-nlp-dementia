import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { IComboBox, ISimilitud } from 'src/app/models/Documento';
import { CrudServiceService } from 'src/app/services/crud-service.service';

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styles: [],
  providers: [MessageService],
})
export class UploadDatasetComponent implements OnInit {
  listaSimilitudJaccard: ISimilitud[] = [];
  listaSimilitudCoseno: ISimilitud[] = [];
  listaComboBox: IComboBox[] = [];
  formGroup: FormGroup | any;
  mostrarComboBoxColumnas: boolean = false;
  mostrarTablas: boolean = false;
  cols = [
    { field: 'enfoque', header: 'Enfoque' },
    { field: 'porcentaje', header: 'Porcentaje' },
  ];
  file: File | undefined;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private crudService: CrudServiceService
  ) {}

  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formGroup = this.fb.group({
      columna: [null, Validators.required]
    })
  }

  limpiarFormulario() {
    this.formGroup.get('columna').reset();
    this.mostrarTablas = false;
    this.mostrarComboBoxColumnas = false;
    this.listaComboBox = [];
    this.listaSimilitudCoseno = [];
    this.listaSimilitudJaccard = [];
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  subirArchivo() {
    if (this.file) {
      if (this.file.type == 'text/csv') {
        let formParams = new FormData();
        formParams.append('file', this.file);
        this.crudService.subirArchivoCSV(formParams).subscribe((resultado) => {
          this.mostrarComboBoxColumnas = true;
          this.listaComboBox = resultado;
          this.messageService.add({
            severity: 'success',
            summary: 'Archivo cargado',
            detail: 'El archivo se ha cargado correctamente',
          });
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Formato incorrecto',
          detail: 'Debe subir un archivo CSV',
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'No hay archivo',
        detail: 'Debe cargar un archivo para analizar su definición',
      });
    }
  }

  consultarSimilitudDataset() {
    const dato = this.formGroup.controls['columna'].value;
    const dto: IComboBox = {
      id: dato,
      valor: dato,
    };
    this.crudService
      .consultarDefinicionDataset(dto)
      .pipe(take(1))
      .subscribe((resultado) => {
        this.mostrarTablas = true;
        this.listaSimilitudCoseno = resultado.coseno;
        this.listaSimilitudJaccard = resultado.jaccard;
        //this.validarVectorDeCeros();
      });
  }
}
