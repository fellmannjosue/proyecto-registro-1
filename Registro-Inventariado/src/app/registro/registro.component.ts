import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
  observaciones: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registro: Registro = {
    identificacion: '',
    idInventario: '',
    serie: '',
    modelo: '',
    siglas: '',
    usuario: '',
    usuarioAdmin: '',
    fechaEntrega: new Date(),
    entregado: false,
    ipEstatus: '',
    direccionIp: '',
    area: '',
    cargo: '',
    aula: '',
    observaciones: '',
  };

  constructor(private db: AngularFireDatabase) { }

  onSubmit() {
    this.db.list('registros').push(this.registro).then(() => {
      console.log('Registro guardado en Firebase');
    }).catch((error) => {
      console.error('Error al guardar el registro en Firebase', error);
    });
  }
}
