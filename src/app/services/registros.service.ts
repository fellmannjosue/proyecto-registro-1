import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Registro } from '../models/registro.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private registrosRef: AngularFireList<Registro>;

  constructor(private db: AngularFireDatabase) {
    this.registrosRef = this.db.list('/registros');
  }

  addRegistro(registro: Registro) {
    return this.registrosRef.push(registro);
  }

  getRegistros(): Observable<Registro[]> {
    return this.registrosRef
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getRegistroById(id: string): Observable<Registro | null> {
    return this.db
      .object<Registro>(`/registros/${id}`)
      .snapshotChanges()
      .pipe(
        map((action: any) =>
          action.payload.exists() ? { key: action.payload.key, ...action.payload.val() } : null
        )
      );
  }

  updateRegistro(id: string, registro: Registro): Promise<void> {
    return this.registrosRef.update(id, registro);
  }

  // Añadir la función eliminarRegistro aquí
  eliminarRegistro(id: string): Promise<void> {
    return this.registrosRef.remove(id);
  }
}
