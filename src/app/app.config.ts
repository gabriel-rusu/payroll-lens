import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      projectId: "my-staging-ground",
      appId: "1:764201862701:web:3af3295bc051d254d05aa4",
      storageBucket: "my-staging-ground.firebasestorage.app",
      apiKey: "AIzaSyDCfTxwoPrGJxlPzzg81gcSg8ifcnUOg9Q",
      authDomain: "my-staging-ground.firebaseapp.com",
      messagingSenderId: "764201862701",
      measurementId: "G-6DPW4CK248"
    })),
    provideFirestore(() => getFirestore())
  ]
};
