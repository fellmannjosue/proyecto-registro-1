import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Registro } from '../models/registro.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor(private db: AngularFireDatabase) {}

  addRegistro(registro: Registro) {
    return this.db.list('/registros').push(registro);
  }

  getRegistros() {
    return this.db
      .list('/registros')
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
}
