import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { VendorsService } from '../../services/vendors.service';
import { MatDialog } from '@angular/material/dialog';
import { NewVendorComponent } from '../components/vendors/new-vendor/new-vendor.component';
import { DeleteVendorsComponent } from '../components/vendors/delete-vendors/delete-vendors.component';
import { UpdateVendorsComponent } from '../components/vendors/update-vendors/update-vendors.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}
@Component({
  selector: 'app-manage-vendors',
  templateUrl: './manage-vendors.component.html',
  styleUrls: ['./manage-vendors.component.scss'],
})
export class ManageVendorsComponent implements OnInit {
  dataUsers;
  columns: string[] = ['rubro', 'descripcion', 'correo', 'accion'];
  dataSource: any;

  constructor(
    private vendorsService: VendorsService,
    private matDialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.vendorsService.getVendors().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateVendorsComponent, {
        data: element,
        height: '690px',
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  deleteUser(element) {
    this.matDialog
      .open(DeleteVendorsComponent, {
        data: element,
        height: '200px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  newUser() {
    this.matDialog
      .open(NewVendorComponent, {
        height: '750px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
