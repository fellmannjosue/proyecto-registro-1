import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tecnico-login',
  templateUrl: './tecnico-login.component.html',
  styleUrls: ['./tecnico-login.component.css'],
})
export class TecnicoLoginComponent {
  email: string ='';
  password: string='';

  constructor(private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.email, this.password).then(() => {
      this.router.navigate(['/registro']); 
    }).catch((error) => {
      console.error('Error al iniciar sesión', error);
    });
  }
}
