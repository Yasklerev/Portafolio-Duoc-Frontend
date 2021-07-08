import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CargaService } from 'src/app/services/carga.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss'],
})
export class LoadUsersComponent implements OnInit {
  @Input()
  requiredFileType: string;

  selected = 'option1';
  selected2 = 'option1';

  uploadProgress: number;
  uploadSub: Subscription;
  dataJson = [];
  btnProcesando = false;
  file: File;
  archivo = false;
  nombreArchivo;
  abrirPeriodo = false;
  name = 'This is XLSX TO JSON CONVERTER';
  dataExcel: any;

  constructor(private cargaService: CargaService) {}
  ngOnInit() {}

  upload(event) {
    let workBook = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.dataExcel = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataExcel = this.dataExcel.Sheet1;
    };
    reader.readAsBinaryString(file);

    this.file = event.target.files[0];
    this.archivo = true;
    this.nombreArchivo = this.file.name;
    if (this.file) {
      this.uploadProgress = 1;
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          this.uploadProgress++;
        }, 300);
      }
    } else {
      console.log('no hay archivos');
    }
  }

  sendUpload() {
    if (this.file) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registros guardaddos correctamente.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.cargaService.load(this.dataExcel).subscribe((data) => {
        console.log(data);
      });

      this.deleteUpload();
    } else {
      Swal.fire({
        title: 'No hay archivos seleccionados!',
        text: 'No estás subiendo nada, asegúrate primero de escoger un archivo.',
        icon: 'error',
        confirmButtonText: 'Entiendo',
      });
    }
  }

  deleteUpload() {
    this.file = null;
    this.dataExcel = null;
    this.nombreArchivo = null;
    this.archivo = false;
    this.uploadProgress = 0;
  }
}
