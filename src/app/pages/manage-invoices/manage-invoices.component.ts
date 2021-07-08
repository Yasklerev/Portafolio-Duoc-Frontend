import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteInvoiceComponent } from '../components/delete-invoice/delete-invoice.component';
import { NewInvoiceComponent } from '../components/new-invoice/new-invoice.component';
import { InvioceService } from '../../services/invioce.service';
import { DetailInvoiceComponent } from '../components/detail-invoice/detail-invoice.component';

export interface PeriodicElement {
  numero: number;
  rubro: number;
  correo: number;
  total: number;
  accion: string;
}

@Component({
  selector: 'app-manage-invoices',
  templateUrl: './manage-invoices.component.html',
  styleUrls: ['./manage-invoices.component.scss'],
})
export class ManageInvoicesComponent implements OnInit {
  dataUsers;
  columns: string[] = ['numero', 'rubro', 'correo', 'total', 'accion'];
  dataSource: any;

  constructor(
    private adminUsersService: AdminUsersService,
    private matDialog: MatDialog,
    private invioceService: InvioceService
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.invioceService.getInvoices().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }

  detailInvoice(element) {
    this.matDialog.open(DetailInvoiceComponent, {
      data: element,
      height: '750px',
      width: '450px',
    });
  }

  deleteInvoice(element) {
    this.matDialog
      .open(DeleteInvoiceComponent, {
        data: element,
        height: '200px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  newInvoice() {
    this.matDialog
      .open(NewInvoiceComponent, {
        height: '750px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
