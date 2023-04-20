import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
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
