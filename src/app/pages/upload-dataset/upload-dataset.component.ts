import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;
  listaSimilitudJaccard: ISimilitud[] = [];
  listaSimilitudCoseno: ISimilitud[] = [];
  listaComboBox: IComboBox[] = [];
  formGroup: FormGroup | any;
  mostrarComboBoxColumnas: boolean = false;
  mostrarTablas: boolean = false;
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
      columna: [null, Validators.required],
      definicion: [null, Validators.required],
    });
  }

  limpiarFormulario() {
    this.formGroup.get('columna').reset();
    this.mostrarTablas = false;
    this.mostrarComboBoxColumnas = false;
    this.listaComboBox = [];
    this.listaSimilitudCoseno = [];
    this.listaSimilitudJaccard = [];
    this.file = undefined;
    this.myInputVariable.nativeElement.value = '';
    this.crudService.eliminarArchivoDataset().pipe(take(1)).subscribe();
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  subirArchivo() {
    if (this.file) {
      if (
        this.file.type == 'text/csv' /*||
        this.file.type ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'*/
      ) {
        let formParams = new FormData();
        formParams.append('file', this.file);
        this.crudService.subirArchivoCSV(formParams).subscribe(
          (resultado) => {
            if (resultado.length == 0) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Archivo vacío',
                detail: 'El archivo cargado se encuentra vacío',
              });
            } else if (resultado.error) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Sin formato',
                detail: resultado.error,
              });
            } else {
              this.mostrarComboBoxColumnas = true;
              this.listaComboBox = resultado;
              this.messageService.add({
                severity: 'success',
                summary: 'Archivo cargado',
                detail: 'El archivo se ha cargado correctamente',
              });
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Servidor no responde',
              detail: 'El servidor a dejado de funcionar',
            });
          }
        );
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
        this.formGroup.controls['definicion'].setValue(resultado.definicion);
        this.formGroup.controls['definicion'].disable();
      });
  }

  // descargarFormato(tipo: string) {
  //   this.crudService
  //     .obtenerFormato(tipo)
  //     .pipe(take(1))
  //     .subscribe((response) => {
  //       var dlnk = document.createElement('a');
  //       const url = 'data:application/octet-stream;base64,' + response.content;
  //       dlnk.href = url;
  //       if (tipo == 'CSV') {
  //         dlnk.setAttribute('download', 'Formato.csv');
  //       } else {
  //         dlnk.setAttribute('download', 'Formato.xlsx');
  //       }
  //       document.body.appendChild(dlnk);
  //       dlnk.click();
  //     });
  // }
  descargarFormato() {
    const tipo = 'CSV';
    this.crudService
      .obtenerFormato(tipo)
      .pipe(take(1))
      .subscribe((response) => {
        var dlnk = document.createElement('a');
        const url = 'data:application/octet-stream;base64,' + response.content;
        dlnk.href = url;
        if (tipo == 'CSV') {
          dlnk.setAttribute('download', 'Formato.csv');
        } else {
          dlnk.setAttribute('download', 'Formato.xlsx');
        }
        document.body.appendChild(dlnk);
        dlnk.click();
      });
  }
}
