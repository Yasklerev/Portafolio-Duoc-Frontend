import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EmployeesService } from '../../services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../components/new-user/new-user.component';
import { UpdateEmployeesComponent } from '../components/employees/update-employees/update-employees.component';
import { DeleteEmployeesComponent } from '../components/employees/delete-employees/delete-employees.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}
@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss'],
})
export class ManageEmployeesComponent implements OnInit {
  dataUsers;
  columns: string[] = ['rut', 'nombres', 'rol', 'correo', 'accion'];
  dataSource: any;

  constructor(
    private employeesService: EmployeesService,
    private matDialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.employeesService.getVendors().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateEmployeesComponent, {
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
      .open(DeleteEmployeesComponent, {
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
      .open(NewUserComponent, {
        height: '750px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
