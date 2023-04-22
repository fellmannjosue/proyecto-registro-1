import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  email: string='';
  password: string='';
  role: string='';

  constructor(private userService: UserService,private router: Router) {}

  onRegister(): void {
    this.userService.register(this.email, this.password, this.role).then(() => {
      this.router.navigate(['/tabla']); 
        }).catch((error) => {
      console.error('Error al registrarse', error);
    });
  }
}
