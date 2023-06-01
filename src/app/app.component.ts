import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  items: MenuItem[] | any;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'home'
      },
      {
        label: 'Consulta',
        icon: 'pi pi-question',
        routerLink: 'consultar-definicion'
      },
      {
        label: 'Dataset original',
        icon: 'pi pi-database',
        routerLink: 'dataset-original'
      },
      {
        label: 'Consultar con documento',
        icon: 'pi pi-upload',
        routerLink: 'subir-dataset'
      }
    ]
  }

}
