import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent implements OnInit {
  form: FormGroup;

  constructor(
    private customerService: CustomerService,
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
    return (
      this.form.get('razon_social').invalid &&
      this.form.get('razon_social').touched
    );
  }

  get apellidosNoValido(): boolean {
    return (
      this.form.get('giro_comercial').invalid &&
      this.form.get('giro_comercial').touched
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
      razon_social: ['', [Validators.required, Validators.minLength(5)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      giro_comercial: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  createUser(): void {
    console.log(this.form.value);

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((data) => {
        data.markAllAsTouched();
      });
      return;
    }

    const user = this.form.value;
    this.customerService.createCustomer(user).subscribe((data: any) => {
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
