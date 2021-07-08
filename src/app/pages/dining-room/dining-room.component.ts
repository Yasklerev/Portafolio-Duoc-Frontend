import { Component, OnInit } from '@angular/core';
import { ComedorService } from 'src/app/services/comedor.service';

@Component({
  selector: 'app-dining-room',
  templateUrl: './dining-room.component.html',
  styleUrls: ['./dining-room.component.scss'],
})
export class DiningRoomComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'plato', 'precio', 'tipo_plato'];
  dataSource: any[];

  constructor(private comedorService: ComedorService) {}
  
  ngOnInit(): void {
    this.comedorService.getMinuta().subscribe((data: any) => {
      console.log(data.data);
      this.dataSource = data.data;
    });
  }
}
