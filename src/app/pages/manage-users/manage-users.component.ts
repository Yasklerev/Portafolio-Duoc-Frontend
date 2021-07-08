import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { NewUserComponent } from '../components/new-user/new-user.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  dataUsers;
  columns: string[] = ['rut', 'nombres', 'rol', 'correo', 'accion'];
  dataSource: any;

  constructor(
    private adminUsersService: AdminUsersService,
    private matDialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.adminUsersService.getUsers().subscribe((data: any) => {
      this.dataSource = data.data;
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateUserComponent, {
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
      .open(DeleteUserComponent, {
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
