import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Registro } from '../models/registro.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registro: Registro = {
    id:'',
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
    direccionIP: '',
    area: '',
    cargo: '',
    aula: '',
    observaciones: '',
  };

  constructor(private db: AngularFireDatabase) { }

  onSubmit(event: Event) {
    event.stopPropagation();
    console.log('onSubmit() llamado');
    this.db.list('registros').push(this.registro).then(() => {
      console.log('Registro guardado en Firebase');
    }).catch((error) => {
      console.error('Error al guardar el registro en Firebase', error);
    });
  }
}
