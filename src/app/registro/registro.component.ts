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
    id: '',
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

  areasCargos = {
    'Área Bilingue': [
      'maestro guia',
      'maestro de español',
      'maestro de matematicas',
      'maestro de ingles',
    ],
    'Área Colegio': [],
    'Área Administracion': [
      // Cargos de Área Administracion
    ],
    Laboratorios: [
      // Cargos de Laboratorios
    ],
    'Área CFP': [
      // Cargos de Área CFP
    ],
  };

  areasAulas = {
    'Área Bilingue': [
      // Aulas de Área Bilingue
    ],
    'Área Colegio': [
      // Aulas de Área Colegio
    ],
    'Área Administracion': [
      // Aulas de Área Administracion
    ],
    Laboratorios: [
      // Aulas de Laboratorios
    ],
    'Área CFP': [
      // Aulas de Área CFP
    ],
  };

  filteredCargos: string[] = [];
  filteredAulas: string[] = [];

  constructor(private db: AngularFireDatabase) {}

  onSubmit(event: Event) {
    event.stopPropagation();
    this.db
      .list('registros')
      .push(this.registro)
      .then(() => {
        console.log('Registro guardado en Firebase');
      })
      .catch((error) => {
        console.error('Error al guardar el registro en Firebase', error);
      });
  }

  onAreaChange(event: any) {
    const area = event.value as keyof typeof this.areasCargos;
    this.filteredCargos = this.areasCargos[area] || [];
    this.filteredAulas = this.areasAulas[area] || [];
  }
}
