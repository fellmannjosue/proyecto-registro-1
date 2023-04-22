import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-register',
  templateUrl: './tecnico-register.component.html',
  styleUrls: ['./tecnico-register.component.css'],
})
export class TecnicoRegisterComponent {
  email: string='';
  password: string='';
  role: string='';

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  onRegister(): void {
    this.userService.register(this.email, this.password, this.role).then(() => {
      this.router.navigate(['/registro']); 
    }).catch((error) => {
      console.error('Error al registrarse', error);
    });
  }
}
