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
  //select de cargo
  areasCargos = {
    'Área Bilingue': [
      'maestro de Grado',
      'maestro de Español',
      'maestro de Sociales',
      'maestro de Matematicas',
      'maestro de Ingles Avanzado',
    ],
    'Área Colegio': [
      'Maestro de Fisica',
      'Maestro de Ciencias',
      'Maestro de Filosofia',
      'Maestro de Lenguaje',
      'Maestro de Matematicas',
      'Maestro de Sociales',
      'Maestro de Ingles Basico',
    ],
    'Área Administracion': [
      'Administracion Direcion',
      'Administracion Secretaria',
      'Administracion General',
    ],
    Laboratorios: [
      'Informatica Avanzada',
      'Laboratorio de Billingüe',
      'Laboratorio de Colegio',
    ],
    'Área CFP': ['Maestro de MA', 'Maestro de P'],
  };
  //select de aula
  areasAulas = {
    'Área Bilingue': [
      'Kinder',
      'Prepa 1',
      'Prepa 2',
      'Primero 1',
      'Primero 2',
      'Segundo 1',
      'Segundo 2',
      'Tercero 1',
      'Tercero 2',
      'Cuarto 1',
      'Cuarto 2',
      'Quinto 1',
      'Quinto 2',
      'Sexto 1',
      'Sexto 2',
      'Septimo',
      'Octavo',
      'Noveno',
      'Aula de Ingles', // aula donde el mr ruiz y mis recarte dan clases
      'Aula biblioteca', //oficina de coordinadoras
      'Aula de ciencia', //aula donde estan las maestras de español
      'Aula de maestro', //aula donde van maestros a trabajar
    ],
    'Área Colegio': [
      //PENDIENTE
      'I bachillerato',
      'Laboratorio de ciencias',
      'II bachillerato',
      'Octavo', //onelia
      'Septimo', //edwin
      'Casa Azul', //rosario
      'casa Psicologia', //juan pablo
    ],
    'Área Administracion': [
      'Edificio Administrativo',
      'Casa Amarilla', //donde esta vanessa
      'Casa Azul', //donde esta fabiola,miguel
      'Casa Psicologia', //donde esta gabi y bani
      'Oficina Don Miguel',
    ],
    Laboratorios: ['Iformatica', 'Computacion col', 'Computacion bl'],
    'Área CFP': ['Panaderia', 'Automotriz'],
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

  onIpEstatusChange(event: any): void {
    const ipEstatus = event.value;
    if (ipEstatus === 'DHCP') {
      const randomIp = this.generateRandomIp();
      this.registro.direccionIP = randomIp;
    } else {
      this.registro.direccionIP = '';
    }
  }

  generateRandomIp(): string {
    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const ip = `192.168.10.${randomNumber(2, 254)}`;
    return ip;
  }
}
