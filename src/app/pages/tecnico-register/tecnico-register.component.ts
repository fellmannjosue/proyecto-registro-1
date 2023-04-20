import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tecnico-register',
  templateUrl: './tecnico-register.component.html',
  styleUrls: ['./tecnico-register.component.css'],
})
export class TecnicoRegisterComponent {
  email: string='';
  password: string='';
  role: string='';

  constructor(private userService: UserService) {}

  onRegister(): void {
    this.userService.register(this.email, this.password, this.role).then(() => {
      // Redirigir a la pantalla de registro, tabla y editar
    }).catch((error) => {
      console.error('Error al registrarse', error);
    });
  }
}
