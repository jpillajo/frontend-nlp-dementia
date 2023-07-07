import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDocumento, ISimilitud } from 'src/app/models/Documento';
import { take } from 'rxjs/operators';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-query-dementia',
  templateUrl: './query-dementia.component.html',
  styles: [],
  providers: [MessageService, UtilService],
})
export class QueryDementiaComponent implements OnInit {
  listaSimilitudJaccard: ISimilitud[] = [];
  listaSimilitudCoseno: ISimilitud[] = [];
  mostrarTablas: boolean = false;

  formGroup: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudServiceService,
    private messageService: MessageService,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formGroup = this.fb.group({
      definicion: ['', Validators.required],
    });
  }

  limpiarFormulario() {
    this.formGroup.get('definicion').reset();
    this.mostrarTablas = false;
  }

  validarVectorDeCeros() {
    let acumuluadorJaccard = 0;
    let acumuluadorCoseno = 0;
    this.listaSimilitudJaccard.forEach((x) => {
      acumuluadorJaccard = acumuluadorJaccard + Number(x['porcentaje']);
    });
    this.listaSimilitudCoseno.forEach((y) => {
      acumuluadorCoseno = acumuluadorCoseno + Number(y['porcentaje']);
    });
    if (acumuluadorCoseno != 0 || acumuluadorJaccard != 0) {
      this.mostrarTablas = true;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Valores de Cero',
        detail:
          'La definición ingresada no se encuentra presente en ningún enfoque propuesto',
      });
    }
  }

  obtenerSimilitud() {
    const dato = this.formGroup.controls['definicion'].value;
    if (dato == '' || dato == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail:
          'Debe ingresar una definición para validar su nivel de similitud',
      });
    } else {
      const dto: IDocumento = {
        definicion: dato,
      };
      this.crudService
        .consultarDefinicion(dto)
        .pipe(take(1))
        .subscribe((resultado) => {
          this.listaSimilitudCoseno = resultado.coseno;
          this.listaSimilitudJaccard = resultado.jaccard;
          this.validarVectorDeCeros();
        });
    }
  }
}
