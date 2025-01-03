import { ConfigService } from '@nestjs/config';

export const getFirebaseConfig = (configService: ConfigService) => ({
  apiKey: configService.get('FIREBASE_API_KEY'),
  authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
  projectId: configService.get('FIREBASE_PROJECT_ID'),
  storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
  appId: configService.get('FIREBASE_APP_ID'),
  measurementId: configService.get('FIREBASE_MEASUREMENT_ID'),
}); 