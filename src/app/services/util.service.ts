import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  prevenirPegar(e: any) {
    e.preventDefault();
    var textoPegado = e.clipboardData.getData('text/plain');
    document.execCommand(
      'insertText',
      false,
      textoPegado.replace(/[^a-zA-Záéíóúñ,.\(\) ]/g, '')
    );
  }
}
