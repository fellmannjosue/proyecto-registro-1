import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Registro } from '../models/registro.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private registrosRef: AngularFireList<Registro>;

  constructor(private db: AngularFireDatabase) {
    this.registrosRef = this.db.list('/registros');
  }

  addRegistro(registro: Registro) {
    const id = uuidv4();
    return this.db.object(`/registros/${id}`).set({ ...registro, id });
  }

  getRegistros(): Observable<Registro[]> {
    return this.registrosRef
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => {
            const registro = c.payload.val();
            return { id: c.payload.key, ...registro };
          })
        )
      );
  }

  getRegistroById(id: string): Observable<Registro > {
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
