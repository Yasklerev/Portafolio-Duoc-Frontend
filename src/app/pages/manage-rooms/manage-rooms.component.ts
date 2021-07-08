import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminUsersService } from '../../services/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { NewUserComponent } from '../components/new-user/new-user.component';
import { UpdateRoomComponent } from '../components/update-room/update-room.component';
import { DeleteRoomComponent } from '../components/delete-room/delete-room.component';
import { NewRoomComponent } from '../components/new-room/new-room.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  rol: number;
  correo: string;
  accion: string;
}

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.scss'],
})
export class ManageRoomsComponent implements OnInit {
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
    this.adminUsersService.getHabitaciones().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log(this.dataSource);
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateRoomComponent, {
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
      .open(DeleteRoomComponent, {
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
      .open(NewRoomComponent, {
        height: '450px',
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
