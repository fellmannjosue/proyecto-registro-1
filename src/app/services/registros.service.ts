import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Registro } from '../models/registro.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private registrosRef: AngularFireList<Registro>;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {
    this.registrosRef = this.db.list('/registros');
  }

  addRegistro(registro: Registro) {
    const id = uuidv4();
    return this.db.object(`/registros/${id}`).set({ ...registro, id });
  }

  getRegistros(): Observable<Registro[]> {
    return this.db
      .list('/registros')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const data = c.payload.val() as Registro;
            const id = c.payload.key!;
            const registro: Registro = { ...data, id: id };
            return registro;
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

  updateRegistro(registroId: string, updatedRegistro: Registro) {
    return this.firestore.collection('registros').doc(registroId).update(updatedRegistro);
  }

  // Añadir la función eliminarRegistro aquí
  eliminarRegistro(id: string): Promise<void> {
    return this.registrosRef.remove(id);
  }
}
