import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private messageService: MessageService) { }

  mostrarMensaje(tipo: string, titulo: string, mensaje: string) {
    if (tipo == 'exito') {
      this.messageService.add({
        severity: 'success',
        summary: titulo,
        detail: mensaje,
      });
    } else if (tipo == 'alerta') {
      this.messageService.add({
        severity: 'warn',
        summary: titulo,
        detail: mensaje,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: titulo,
        detail: mensaje,
      });
    }
  }
}
