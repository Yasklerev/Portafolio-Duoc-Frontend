import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { InvioceService } from '../../services/invioce.service';
import { HostalService } from '../../services/hostal.service';
import { DetailHostalComponent } from '../components/detail-hostal/detail-hostal.component';
import { DeleteHostalComponent } from '../components/delete-hostal/delete-hostal.component';
import { NewHostalComponent } from '../components/new-hostal/new-hostal.component';

export interface PeriodicElement {
  nombre: number;
  direccion: number;
  accion: string;
}

@Component({
  selector: 'app-manage-hostel',
  templateUrl: './manage-hostel.component.html',
  styleUrls: ['./manage-hostel.component.scss'],
})
export class ManageHostelComponent implements OnInit {
  dataUsers;
  columns: string[] = ['nombre', 'direccion', 'accion'];
  dataSource: any;

  constructor(
    private adminUsersService: AdminUsersService,
    private matDialog: MatDialog,
    private invioceService: InvioceService,
    private hostalService: HostalService
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {

    this.hostalService.getHostales().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data;
    })

    this.invioceService.getInvoices().subscribe((data: any) => {
      console.log(data);
    });
  }

  detailInvoice(element) {
    this.matDialog.open(DetailHostalComponent, {
      data: element,
      height: '750px',
      width: '450px',
    });
  }

  deleteInvoice(element) {
    this.matDialog
      .open(DeleteHostalComponent, {
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
      .open(NewHostalComponent, {
        height: '350px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
