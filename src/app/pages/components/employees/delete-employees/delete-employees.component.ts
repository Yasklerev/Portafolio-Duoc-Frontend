import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUsersService } from '../../../../services/admin-users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-delete-employees',
  templateUrl: './delete-employees.component.html',
  styleUrls: ['./delete-employees.component.scss'],
})
export class DeleteEmployeesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog,
    private adminUsersService: AdminUsersService
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    this.adminUsersService.deleteUser(this.data).subscribe((data: any) => {
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
