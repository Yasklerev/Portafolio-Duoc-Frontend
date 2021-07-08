import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { InvioceService } from '../../services/invioce.service';
import { PurchasesService } from '../../services/purchases.service';
import { DetailPurchaseComponent } from '../components/detail-purchase/detail-purchase.component';
import { DeletePurchaseComponent } from '../components/delete-purchase/delete-purchase.component';
import { NewPurchaseComponent } from '../components/new-purchase/new-purchase.component';

export interface PeriodicElement {
  numero: number;
  rubro: number;
  estado: string;
  accion: string;
}
@Component({
  selector: 'app-manage-purchases',
  templateUrl: './manage-purchases.component.html',
  styleUrls: ['./manage-purchases.component.scss'],
})
export class ManagePurchasesComponent implements OnInit {
  dataUsers;
  columns: string[] = ['numero', 'nombres', 'rubro', 'estado', 'accion'];
  dataSource: any;
  rol;

  constructor(
    private adminUsersService: AdminUsersService,
    private matDialog: MatDialog,
    private invioceService: InvioceService,
    private purchasesService: PurchasesService
  ) {
    this.rol = JSON.parse(localStorage.getItem('usuarioHostal')).rol_id;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.purchasesService.getPurchases().subscribe((data: any) => {
      this.dataSource = data.data;
    });
  }

  detailPurchase(element) {
    const dialog = this.matDialog.open(DetailPurchaseComponent, {
      data: element,
      height: '920px',
      width: '550px',
    });
    dialog.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deletePurchase(element) {
    this.matDialog
      .open(DeletePurchaseComponent, {
        data: element,
        height: '200px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  newPurchase() {
    this.matDialog
      .open(NewPurchaseComponent, {
        height: '750px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
