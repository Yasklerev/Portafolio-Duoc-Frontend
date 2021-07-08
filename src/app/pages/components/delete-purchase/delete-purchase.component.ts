import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchasesService } from 'src/app/services/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.scss'],
})
export class DeletePurchaseComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog,
    private PurchasesService: PurchasesService
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    this.PurchasesService.deletePurchase(this.data).subscribe((data: any) => {
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
    });

    this.matDialog.closeAll();
  }

  cancel() {
    this.matDialog.closeAll();
  }
}
