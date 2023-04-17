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
      direccion: new FormControl(''),
      observaciones: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registroId = params['id'];

      this.registroService.getRegistroById(this.registroId).subscribe(registro => {
        this.registro = registro;
        if (this.registro) {
          this.registroForm.patchValue(this.registro as { [key: string]: any });
        }
      });
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const updatedRegistro = this.registroForm.value;

    this.registroService.updateRegistro(this.registroId, updatedRegistro).then(() => {
      this.router.navigate(['/tabla']); // Reemplaza '/registros' con la ruta donde se muestran los registros
    });
  }

  onCancel(): void {
    this.router.navigate(['/tabla']); // Reemplaza '/registros' con la ruta donde se muestran los registros
  }
}
