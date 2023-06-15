import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  items: MenuItem[] | any;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'home',
      },
      {
        label: 'Consulta',
        icon: 'pi pi-question',
        routerLink: 'consultar-definicion',
      },
      {
        label: 'Dataset original',
        icon: 'pi pi-database',
        routerLink: 'dataset-original',
      },
      {
        label: 'Consultar con documento',
        icon: 'pi pi-upload',
        routerLink: 'subir-dataset',
      },
    ];
  }

  activeMenu(event: any) {
    let node;
    if (event.target.classList.contains('p-submenu-header') == true) {
      node = 'submenu';
    } else if (event.target.tagName === 'SPAN') {
      node = event.target.parentNode.parentNode;
    } else {
      node = event.target.parentNode;
    }
    if (node != 'submenu') {
      let menuitem = document.getElementsByClassName('p-menuitem');
      for (let i = 0; i < menuitem.length; i++) {
        menuitem[i].classList.remove('active');
      }
      node.classList.add('active');
    }
  }
}
