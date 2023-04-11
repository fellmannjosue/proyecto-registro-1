import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

interface Registro {
  identificacion: string;
  idInventario: string;
  serie: string;
  modelo: string;
  siglas: string;
  usuario: string;
  usuarioAdmin: string;
  fechaEntrega: Date;
  entregado: boolean;
  ipEstatus: string;
  direccionIp: string;
  area: string;
  cargo: string;
  aula: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  registros: Observable<Registro[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.registros = this.db.list<Registro>('registros').valueChanges();
  }

  exportarExcel() {
    // Aquí va la lógica para exportar los datos a Excel
  }

  exportarPDF() {
    // Aquí va la lógica para exportar los datos a PDF
  }
}
