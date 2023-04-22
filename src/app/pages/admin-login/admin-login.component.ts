import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string ='';
  password: string='';

  constructor(private userService: UserService,private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.email, this.password).then(() => {
      this.router.navigate(['/tabla']); 
    }).catch((error) => {
      console.error('Error al iniciar sesión', error);
    });
  }
}
