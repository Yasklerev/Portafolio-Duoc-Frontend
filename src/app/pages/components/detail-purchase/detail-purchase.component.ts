import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PurchasesService } from 'src/app/services/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-purchase',
  templateUrl: './detail-purchase.component.html',
  styleUrls: ['./detail-purchase.component.scss'],
})
export class DetailPurchaseComponent implements OnInit {
  dataComplete: any;
  rol;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private purchasesService: PurchasesService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.rol = JSON.parse(localStorage.getItem('usuarioHostal')).rol_id;
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      respuesta: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.purchasesService
      .getPurchase(this.data.numero)
      .subscribe((data: any) => {
        this.dataComplete = data.data[0];
      });
  }

  responseVendor() {
    const data = {
      numero: this.data.numero,
      respuesta: this.form.value.respuesta,
    };

    this.purchasesService.responsePurchase(data).subscribe((data: any) => {
      if (data.error === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
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
      this.matDialog.closeAll();
    });
  }

  aprobar() {
    const data = {
      status: 'Aprobado',
      numero: this.dataComplete.numero,
    };

    this.purchasesService.aprobarRechazar(data).subscribe((data: any) => {
      if (data.error === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
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
      this.matDialog.closeAll();
    });
  }

  rechazar() {
    const data = {
      status: 'Rechazado',
      numero: this.dataComplete.numero,
    };

    this.purchasesService.aprobarRechazar(data).subscribe((data: any) => {
      if (data.error === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
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
      this.matDialog.closeAll();
    });
  }
}
