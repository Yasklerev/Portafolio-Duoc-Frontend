import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log('este es el inicio de sesion');
    console.log(this.form.value);

    this.authService.login(this.form.value).subscribe((data: any) => {
      if (data.error === true) {
        Swal.fire({
          title: 'Error al inicar sesión!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Entiendo',
        });
      }

      if (data.error === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        const userLocalStorage = {
          id: data.user[0].id,
          nombres: data.user[0].nombres,
          apelllidos: data.user[0].apellidos,
          correo: data.user[0].correo,
          rut: data.user[0].rut,
          rol_id: data.user[0].rol_id,
          telefono: data.user[0].telefono,
          proveedor_id: data.user[0].proveedor_id,
          empresa_id: data.user[0].empresa_id,
        };

        localStorage.setItem('usuarioHostal', JSON.stringify(userLocalStorage));

        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      }
    });
  }
}
