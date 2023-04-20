import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tecnico-login',
  templateUrl: './tecnico-login.component.html',
  styleUrls: ['./tecnico-login.component.css'],
})
export class TecnicoLoginComponent {
  email: string ='';
  password: string='';

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.login(this.email, this.password).then(() => {
      // Redirigir a la pantalla de registro, tabla y editar
    }).catch((error) => {
      console.error('Error al iniciar sesión', error);
    });
  }
}
