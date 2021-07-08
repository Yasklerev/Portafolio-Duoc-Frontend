import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GuestsService } from '../../services/guests.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { NewUserComponent } from '../components/new-user/new-user.component';
import { UpdateGuestsComponent } from '../components/guests/update-guests/update-guests.component';
import { DeleteGuestsComponent } from '../components/guests/delete-guests/delete-guests.component';
import { DetailGuestComponent } from '../components/guests/detail-guest/detail-guest.component';

export interface PeriodicElement {
  rut: string;
  nombres: string;
  correo: string;
  empresa: string;
  accion: string;
}

@Component({
  selector: 'app-manage-guests',
  templateUrl: './manage-guests.component.html',
  styleUrls: ['./manage-guests.component.scss'],
})
export class ManageGuestsComponent implements OnInit {
  dataUsers;
  columns: string[] = ['rut', 'nombres', 'correo', 'empresa', 'accion'];
  dataSource: any;

  constructor(
    private guestsService: GuestsService,
    private matDialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.guestsService.getGuests().subscribe((data: any) => {
      this.dataSource = data.data;
    });
  }

  updateUserModal(element) {
    this.matDialog
      .open(UpdateGuestsComponent, {
        data: element,
        height: '740px',
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  deleteUser(element) {
    this.matDialog
      .open(DeleteGuestsComponent, {
        data: element,
        height: '200px',
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  detailUserModal(element) {
    this.matDialog
      .open(DetailGuestComponent, {
        data: element,
        height: '600px',
        width: '600px',
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
