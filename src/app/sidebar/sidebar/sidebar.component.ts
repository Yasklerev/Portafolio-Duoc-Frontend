import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  rol;

  constructor() { 
    this.rol = JSON.parse(localStorage.getItem('usuarioHostal')).rol_id;
  }

  ngOnInit(): void {
  }

  asd() {
    location.reload();
  }


}
