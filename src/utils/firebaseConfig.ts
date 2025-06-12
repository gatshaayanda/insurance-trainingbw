import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, Firestore } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:             process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:         process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:              process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId:      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize or reuse existing app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// AUTH
export const auth: Auth = getAuth(app);
if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true"
) {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}

// FIRESTORE
export const firestore: Firestore = getFirestore(app);
if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true"
) {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

// ANALYTICS
let _analytics: Analytics | null = null;
export async function getAnalyticsClient(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  const { isSupported, getAnalytics } = await import("firebase/analytics");
  if (await isSupported()) {
    _analytics ||= getAnalytics(app);
    return _analytics;
  }
  return null;
}
