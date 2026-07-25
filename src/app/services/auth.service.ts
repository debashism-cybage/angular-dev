import { Injectable, signal, computed } from '@angular/core';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseFirestore } from '../firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly loading = signal(true);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isLoading = this.loading.asReadonly();

  private readonly auth = getFirebaseAuth();
  private readonly firestore = getFirebaseFirestore();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      this.loading.set(false);
    });
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    await this.storeUserData(result.user);
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    await this.storeUserData(result.user);
  }

  async signUpWithEmail(email: string, password: string, displayName: string): Promise<void> {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(result.user, { displayName });
    await this.storeUserData(result.user);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  private async storeUserData(user: User): Promise<void> {
    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
  }
}
