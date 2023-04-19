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
          this.registroForm.patchValue({ ...this.registro, id: this.registroId });
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
  areasCargos = {
    'Área Bilingue': [
      'maestro guia','maestro de español','maestro de matematicas','maestro de ingles'
    ],
    'Área Colegio': [
      
    ],
    'Área Administracion': [
      // Cargos de Área Administracion
    ],
    'Laboratorios': [
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
    'Laboratorios': [
      // Aulas de Laboratorios
    ],
    'Área CFP': [
      // Aulas de Área CFP
    ],
  };

  filteredCargos: string[] = [];
  filteredAulas: string[] = [];

  onAreaChange(event: any) {
    const area = event.value as keyof typeof this.areasCargos;
    this.filteredCargos = this.areasCargos[area] || [];
    this.filteredAulas = this.areasAulas[area] || [];
  }
  
}
