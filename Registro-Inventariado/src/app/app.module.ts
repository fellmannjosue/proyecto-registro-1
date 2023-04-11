import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { TablaComponent } from './tabla/tabla.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCkdu4qRd2uK3vkLMNeg1sN0v9WCkvPSso",
  authDomain: "inventory-4116d.firebaseapp.com",
  projectId: "inventory-4116d",
  storageBucket: "inventory-4116d.appspot.com",
  messagingSenderId: "1094957442023",
  appId: "1:1094957442023:web:1eb1cccb17ec01cee85342",
  measurementId: "G-YZRS658KF8"
};

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    TablaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
