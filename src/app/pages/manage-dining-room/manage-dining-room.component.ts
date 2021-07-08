import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

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
import { ComedorService } from 'src/app/services/comedor.service';
import { Router } from '@angular/router';
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
  selector: 'app-manage-dining-room',
  templateUrl: './manage-dining-room.component.html',
  styleUrls: ['./manage-dining-room.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ManageDiningRoomComponent implements OnInit {
  date1 = new FormControl(moment());
  date;
  dia = 6;
  contador = 0;
  despachos = [
    { fecha: '' },
    { fecha: '' },
    { fecha: '' },
    { fecha: '' },
    { fecha: '' },
    { fecha: '' },
    { fecha: '' },
  ];
  obj;
  isEditable = false;
  form: FormGroup;
  dateSelected: any;
  dataMenu: any[] = [
    {
      plato1: null,
      precio1: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato2: null,
      precio2: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato3: null,
      precio3: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato4: null,
      precio4: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato5: null,
      precio5: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato6: null,
      precio6: null,
      fecha: {
        fecha: '',
      },
    },
    {
      plato7: null,
      precio7: null,
      fecha: {
        fecha: '',
      },
    },
  ];

  tipoPlatos: any[] = [{ id: null, nombre: null }];

  dataSource: any[] = [
    {
      position: this.despachos[0].fecha,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
    },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private comedorService: ComedorService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      plato1: ['', [Validators.required]],
      precio1: ['', [Validators.required]],
      tipo_plato1: ['', [Validators.required]],
      plato2: ['', [Validators.required]],
      precio2: ['', [Validators.required]],
      tipo_plato2: ['', [Validators.required]],
      plato3: ['', [Validators.required]],
      precio3: ['', [Validators.required]],
      tipo_plato3: ['', [Validators.required]],
      plato4: ['', [Validators.required]],
      precio4: ['', [Validators.required]],
      tipo_plato4: ['', [Validators.required]],
      plato5: ['', [Validators.required]],
      precio5: ['', [Validators.required]],
      tipo_plato5: ['', [Validators.required]],
      plato6: ['', [Validators.required]],
      precio6: ['', [Validators.required]],
      tipo_plato6: ['', [Validators.required]],
      plato7: ['', [Validators.required]],
      precio7: ['', [Validators.required]],
      tipo_plato7: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    });
  }

  get fechaNacNoValido(): boolean {
    return (
      this.form.get('fecha_nacimiento').invalid &&
      this.form.get('fecha_nacimiento').touched
    );
  }

  ngOnInit(): void {
    this.comedorService.getTipoPlatos().subscribe((data: any) => {
      this.tipoPlatos = data.data;
    });
  }

  createBill() {
    this.dateSelected = null;
    this.obj = null;
    this.despachos = [];

    this.dateSelected =
      this.form.value.fecha_nacimiento._i.year +
      '-' +
      this.form.value.fecha_nacimiento._i.month +
      '-' +
      this.form.value.fecha_nacimiento._i.date;

    for (let i = 0; i < 7; i++) {
      const fecha = moment(this.dateSelected)
        .add(i, 'days')
        .format('YYYY/MM/DD HH:mm:ss');
      moment(new Date()).add(i, 'days').format('YYYYMMDD');
      this.obj = {
        fecha,
      };
      this.despachos.push(this.obj);
    }
  }

  data() {
    this.dataMenu = [
      {
        plato1: this.form.value.plato1,
        precio1: this.form.value.precio1,
        fecha: this.despachos[0],
        tipo_plato1: this.form.value.tipo_plato1,
      },
      {
        plato2: this.form.value.plato2,
        precio2: this.form.value.precio2,
        fecha: this.despachos[1],
        tipo_plato2: this.form.value.tipo_plato2,
      },
      {
        plato3: this.form.value.plato3,
        precio3: this.form.value.precio3,
        fecha: this.despachos[2],
        tipo_plato3: this.form.value.tipo_plato3,
      },
      {
        plato4: this.form.value.plato4,
        precio4: this.form.value.precio4,
        fecha: this.despachos[3],
        tipo_plato4: this.form.value.tipo_plato4,
      },
      {
        plato5: this.form.value.plato5,
        precio5: this.form.value.precio5,
        fecha: this.despachos[4],
        tipo_plato5: this.form.value.tipo_plato5,
      },
      {
        plato6: this.form.value.plato6,
        precio6: this.form.value.precio6,
        fecha: this.despachos[5],
        tipo_plato6: this.form.value.tipo_plato6,
      },
      {
        plato7: this.form.value.plato7,
        precio7: this.form.value.precio7,
        fecha: this.despachos[6],
        tipo_plato7: this.form.value.tipo_plato7,
      },
    ];

    console.log(this.dataMenu);
  }

  confirmar() {
    this.comedorService.saveMinuta(this.dataMenu).subscribe((data: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        this.router.navigateByUrl('minuta-comedor');
      }, 2000);
    });
  }
}
