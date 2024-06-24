import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-fcb56","appId":"1:418828890518:web:197cfaac6a86472e5dedb7","storageBucket":"ring-of-fire-fcb56.appspot.com","apiKey":"AIzaSyDl7OqZKb7gB9kfBmwvp3K3m_5xc9Jargo","authDomain":"ring-of-fire-fcb56.firebaseapp.com","messagingSenderId":"418828890518"})), provideFirestore(() => getFirestore())]
};
