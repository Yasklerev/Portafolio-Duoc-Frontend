import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
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
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewUserComponent implements OnInit {
  date = new FormControl(moment());

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get rutNoValido(): boolean {
    return this.form.get('rut').invalid && this.form.get('rut').touched;
  }

  get nombreNoValido(): boolean {
    return this.form.get('nombres').invalid && this.form.get('nombres').touched;
  }

  get apellidosNoValido(): boolean {
    return (
      this.form.get('apellidos').invalid && this.form.get('apellidos').touched
    );
  }

  get correoNoValido(): boolean {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get telefonoNoValido(): boolean {
    return (
      this.form.get('telefono').invalid && this.form.get('telefono').touched
    );
  }

  get passwordNoValido(): boolean {
    return (
      this.form.get('password').invalid && this.form.get('password').touched
    );
  }

  get password2NoValido(): boolean {
    return (
      this.form.get('password2').invalid && this.form.get('password2').touched
    );
  }

  get fechaNacNoValido(): boolean {
    return (
      this.form.get('fecha_nacimiento').invalid &&
      this.form.get('fecha_nacimiento').touched
    );
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      rut: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      nombres: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', [Validators.required]],
      rol_id: [6],
      empresa_id: [null],
      proveedor_id: [null],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  createUser(): void {
    if (this.form.value.password !== this.form.value.password2) {
      Swal.fire({
        title: 'Las contraseñas no coinciden!',
        text: 'Asegúrate de escribir bien tu contraseña.',
        icon: 'error',
        confirmButtonText: 'Entiendo',
      });
      return;
    }

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((data) => {
        data.markAllAsTouched();
      });
      return;
    }

    const user = this.form.value;
    this.authService.createUser(user).subscribe((data: any) => {
      if (data.error === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.matDialog.closeAll();

      }

      if (data.error === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
