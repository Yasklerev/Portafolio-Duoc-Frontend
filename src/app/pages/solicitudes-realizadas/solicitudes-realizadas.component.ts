import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { NewUserComponent } from '../components/new-user/new-user.component';
import { ClientService } from 'src/app/services/client.service';
import { ServicesUserComponent } from '../components/services-user/services-user.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { CargaService } from 'src/app/services/carga.service';
import { DetalleServicioComponent } from '../components/detalle-servicio/detalle-servicio.component';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'DD-MM-YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'DD-MM-YYYY',
  },
};

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}

@Component({
  selector: 'app-solicitudes-realizadas',
  templateUrl: './solicitudes-realizadas.component.html',
  styleUrls: ['./solicitudes-realizadas.component.scss'],
})
export class SolicitudesRealizadasComponent implements OnInit {
  date = new FormControl(moment());
  dataUsers;
  columns: string[] = ['rut', 'nombres', 'rol', 'correo', 'accion'];
  dataSource: any;

  constructor(
    private adminUsersService: AdminUsersService,
    private matDialog: MatDialog,
    private clientService: ClientService,
    private cargaService: CargaService
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.cargaService.obtenerSolicitudes().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }

  deleteUser(element) {
    this.matDialog
      .open(DeleteUserComponent, {
        data: element,
        height: '200px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  servicesUser(element) {
    this.matDialog
      .open(DetalleServicioComponent, {
        data: element,
        height: '850px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
