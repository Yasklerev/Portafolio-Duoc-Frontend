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
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { PurchasesService } from 'src/app/services/purchases.service';
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
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss'],
})
export class NewPurchaseComponent implements OnInit {
  date = new FormControl(moment());

  form: FormGroup;
  dataVendors: any;
  selected: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matDialog: MatDialog,
    private adminUsersService: AdminUsersService,
    private purchasesService: PurchasesService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.purchasesService.getVendors().subscribe((data: any) => {
      this.dataVendors = data.data;
    });
  }

  get rutNoValido(): boolean {
    return this.form.get('rut').invalid && this.form.get('rut').touched;
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      proveedor: ['', [Validators.required]],
      solicitud: ['', [Validators.required]],
      comentarios: ['', [Validators.required]],
    });
  }

  createUser(): void {

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((data) => {
        data.markAllAsTouched();
      });
      return;
    }

    const data =  {
		...this.form.value,
		usuario_id: JSON.parse(localStorage.getItem('usuarioHostal')),
		estado: 'Pendiente'
	};
    console.log(data);
    
	this.purchasesService.creatPurchase(data).subscribe((data: any) => {
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
