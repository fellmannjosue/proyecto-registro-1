import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { TablaComponent } from './tabla/tabla.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { TecnicoLoginComponent } from './pages/tecnico-login/tecnico-login.component';
import { TecnicoRegisterComponent } from './pages/tecnico-register/tecnico-register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'tabla', component: TablaComponent },
  { path: 'editar/:id',component: EditarRegistroComponent,},
  { path: 'tecnico-login', component: TecnicoLoginComponent },
  { path: 'tecnico-register', component: TecnicoRegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
