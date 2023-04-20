import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}

  createUser(uid: string, email: string, role: string): Promise<void> {
    return this.firestore.collection('users').doc(uid).set({
      email: email,
      role: role,
    });
  }

  async register(email: string, password: string, role: string): Promise<void> {
    try {
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential.user) {
        const uid = userCredential.user.uid;
        return this.createUser(uid, email, role);
      } else {
        throw new Error('No se pudo obtener la información del usuario');
      }
    } catch (error) {
      console.error('Error al registrarse', error);
      throw error;
    }
  }
  

  async login(email: string, password: string): Promise<void> {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  }
}
