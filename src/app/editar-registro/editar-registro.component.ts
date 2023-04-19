import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registros.service';
import { Registro } from '../models/registro.model';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit {
  registroForm: FormGroup;
  registroId: string = '';
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
    ipEstatus: '',
    direccionIP: '',
    observaciones: '',
    entregado: false,
    area: '',
    cargo: '',
    aula: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registroService: RegistroService
  ) {
    this.registroForm = new FormGroup({
      identificacion: new FormControl(''),
      idInventario: new FormControl(''),
      serie: new FormControl(''),
      modelo: new FormControl(''),
      siglas: new FormControl(''),
      usuario: new FormControl(''),
      usuarioAdmin: new FormControl(''),
      fechaEntrega: new FormControl(''),
      ipEstatus: new FormControl(''),
      direccionIP: new FormControl(''),
      entregado: new FormControl(''),
      area: new FormControl(''),
      cargo: new FormControl(''),
      aula: new FormControl(''),
      observaciones: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registroId = params['id'];
  
      if (this.registroId) {
        this.registroService.getRegistroById(this.registroId).subscribe(registro => {
          this.registro = registro;
          // Asigna los valores al formulario
          this.registroForm.patchValue({
            identificacion: registro.identificacion,
            idInventario: registro.idInventario,
            serie: registro.serie,
            modelo: registro.modelo,
            siglas: registro.siglas,
            usuario: registro.usuario,
            usuarioAdmin: registro.usuarioAdmin,
            fechaEntrega: new Date(registro.fechaEntrega),
            ipEstatus: registro.ipEstatus,
            direccionIP: registro.direccionIP,
            observaciones: registro.observaciones
          });
  
          // Asigna los valores a registro.area, registro.cargo, registro.aula y registro.entregado
          this.registro.area = registro.area;
          this.registro.cargo = registro.cargo;
          this.registro.aula = registro.aula;
          this.registro.entregado = registro.entregado;
  
          // Llama a onAreaChange para actualizar los cargos y aulas disponibles
          this.onAreaChange({ value: this.registro.area });
        });
      } else {
        // Redirigir al usuario a la página de registros si el registroId es inválido
        this.router.navigate(['/tabla']); // Cambiar aquí a una ruta válida
      }
    });
  }
  
  
  
  onSubmit(event: Event): void {
    event.preventDefault();
  
    // Verificar si el registroId está vacío
    if (!this.registroId || this.registroId.trim() === '') {
      console.error('El ID del registro está vacío.');
      return;
    }
  
    const updatedRegistro = {
      ...this.registroForm.value,
      id: this.registroId
    };
  
    this.registroService.updateRegistro(this.registroId, updatedRegistro).then(() => {
      this.router.navigate(['/tabla']); 
    });
  }
  

  onCancel(): void {
    this.router.navigate(['/tabla']); // Reemplaza '/registros' con la ruta donde se muestran los registros
  }
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

  onAreaChange(event: any) {
    const area = event.value as keyof typeof this.areasCargos;
    this.filteredCargos = this.areasCargos[area] || [];
    this.filteredAulas = this.areasAulas[area] || [];
  }

  onIpEstatusChange(event: any): void {
    const ipEstatus = event.value;
    const direccionIPControl = this.registroForm.controls['direccionIP'];
  
    if (ipEstatus === 'DHCP') {
      direccionIPControl.patchValue(''); // Limpia el valor del campo de dirección IP
      direccionIPControl.disable(); // Deshabilita el campo de dirección IP cuando se selecciona DHCP
    } else {
      direccionIPControl.patchValue('');
      direccionIPControl.enable(); // Habilita el campo de dirección IP cuando se selecciona Estática
    }
  }
  
}
