import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUsersService } from '../../../services/admin-users.service';
import Swal from 'sweetalert2';
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

@Component({
  selector: 'app-services-user',
  templateUrl: './services-user.component.html',
  styleUrls: ['./services-user.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ServicesUserComponent implements OnInit {
  date = new FormControl(moment());
  form: FormGroup;
  dataRoles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private adminUsersService: AdminUsersService,
    private formBuilder: FormBuilder,
    private cargaService: CargaService
  ) {}

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  ngOnInit(): void {
    this.createForm();

    this.cargaService.tipoSolicitudes().subscribe((data: any) => {
      this.dataRoles = data.data;
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [this.data.id],
      fecha_inicio: ['', [Validators.required]],
      fecha_termino: ['', [Validators.required]],
      tipo_solicitud: ['', [Validators.required]],
    });
  }

  solicitarServicio() {
    const data = {
      tipo_solicitud_id: this.form.value.tipo_solicitud,
      estado: 'Pendiente',
      empresa_id: 1,
      usuario_id: this.form.value.id,
      fecha_inicio:
        this.form.value.fecha_inicio._i.date +
        '-' +
        this.form.value.fecha_inicio._i.month +
        '-' +
        this.form.value.fecha_inicio._i.year,
      fecha_termino:
        this.form.value.fecha_termino._i.date +
        '-' +
        this.form.value.fecha_termino._i.month +
        '-' +
        this.form.value.fecha_termino._i.year,
      total: 0,
      factura_id: null,
    };

    this.cargaService.crearSolicitud(data).subscribe((data1: any) => {
      console.log(data1);
      this.dialog.closeAll();
    });
  }
}
