import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUsersService } from '../../../../services/admin-users.service';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss'],
})
export class NewVendorComponent implements OnInit {
  form: FormGroup;
  dataRoles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private adminUsersService: AdminUsersService,
    private formBuilder: FormBuilder
  ) {}

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  ngOnInit(): void {
    this.createForm();
    this.adminUsersService.getRoles().subscribe((data: any) => {
      this.dataRoles = data.data;
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [this.data.id],
      rut: [
        this.data.rut,
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      nombres: [
        this.data.nombres,
        [Validators.required, Validators.minLength(5)],
      ],
      apellidos: [
        this.data.apellidos,
        [Validators.required, Validators.minLength(5)],
      ],
      correo: [this.data.correo, [Validators.required, Validators.email]],
      telefono: [this.data.telefono, [Validators.required]],
      rol: [this.data.rol, [Validators.required]],
    });
  }

  updateUser() {
    this.adminUsersService
      .updateUser(this.form.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.error === false) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialog.closeAll();
        }
        if (data.error === true) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialog.closeAll();
        }
      });
  }
}
