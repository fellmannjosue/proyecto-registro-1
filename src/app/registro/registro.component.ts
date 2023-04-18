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
  cargosFiltrados: any[] = [];
  aulasFiltradas: any[] = [];

  // Asegúrate de importar el área, los cargos y las aulas aquí
  areas: any[] = ['Área Bilingue','Área Colegio'];
  cargos: any[] = ['Maestro Guia','Maestro Asociado'];
  aulas: any[] = ['kinder','prepa 1','prepa 2','primero 1','primero 2','segundo 1','segundo 2','tercero 1','tercero 2','cuarto 1'];

  constructor(private db: AngularFireDatabase) { }

  onSubmit(event: Event) {
    event.stopPropagation();
    this.db.list('registros').push(this.registro).then(() => {
      console.log('Registro guardado en Firebase');
    }).catch((error) => {
      console.error('Error al guardar el registro en Firebase', error);
    });
  }

  onAreaChange(event: any) {
    this.cargosFiltrados = this.cargos.filter(cargo => cargo.area === event.value);
    this.aulasFiltradas = this.aulas.filter(aula => aula.area === event.value);
  }
}
