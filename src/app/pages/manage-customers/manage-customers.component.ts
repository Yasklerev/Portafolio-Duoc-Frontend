import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerComponent } from '../components/customers/update-customer/update-customer.component';
import { DeleteCustomerComponent } from '../components/customers/delete-customer/delete-customer.component';
import { NewCustomerComponent } from '../components/customers/new-customer/new-customer.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}
@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  dataUsers;
  columns: string[] = ['rut', 'nombres', 'rol', 'correo', 'accion'];
  dataSource: any;

  constructor(
    private customerService: CustomerService,
    private matDialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data: any) => {
      this.dataSource = data.data;
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateCustomerComponent, {
        data: element,
        height: '590px',
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  deleteUser(element) {
    this.matDialog
      .open(DeleteCustomerComponent, {
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
      .open(NewCustomerComponent, {
        height: '590px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
