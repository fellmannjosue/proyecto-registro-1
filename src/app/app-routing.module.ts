import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { TablaComponent } from './tabla/tabla.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'tabla', component: TablaComponent },
  { path: 'editar-registro/:id',component: EditarRegistroComponent,},
  { path: '', redirectTo: '/registro', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
