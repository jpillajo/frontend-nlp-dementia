import { Component, OnInit } from '@angular/core';
import { IComboBox, IDataset, IEnfoques } from 'src/app/models/Documento';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { take } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-original-dataset',
  templateUrl: './original-dataset.component.html',
  styles: [],
  providers: [MessageService],
})
export class OriginalDatasetComponent implements OnInit {
  listaSimilitudJaccard: IDataset[] = [];
  listaSimilitudCoseno: IDataset[] = [];
  mostrarTablas: boolean = false;
  formGroup: FormGroup | any;
  enfoques: IEnfoques[] = [];
  nombreEnfoque: string | any;

  constructor(
    private crudService: CrudServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.enfoques = [
      { nombre: 'BIOMÉDICO', valor: 0 },
      { nombre: 'PSICOSOCIAL - COMUNITARIO', valor: 1 },
      { nombre: 'COTIDIANO', valor: 2 },
    ];
    this.construirFormulario();
  }

  construirFormulario() {
    this.formGroup = this.fb.group({
      enfoque: [null, Validators.required],
    });
  }

  obtenerDatasetOriginalEnfoque() {
    const dato = this.formGroup.controls['enfoque'].value;
    const dto: IComboBox = {
      id: dato,
      valor: dato,
    };
    this.crudService
      .obtenerDataset(dto)
      .pipe(take(1))
      .subscribe(
        (resultado) => {
          this.mostrarTablas = true;
          this.nombreEnfoque =
            'Está revisando el enfoque ' + this.enfoques[dato].nombre;
          this.listaSimilitudJaccard = resultado.jaccard;
          this.listaSimilitudCoseno = resultado.coseno;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Servidor no responde',
            detail: 'El servidor a dejado de funcionar',
          });
        }
      );
  }
}
