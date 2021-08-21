import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // use providers to login user
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  chooseProviderLogin(provider: string) {
    return new Promise<any>((resolve, reject) => {

      // switch throug all available providers
      switch (provider) {


        case "google": {
          let google = new firebase.auth.GoogleAuthProvider();
          google.addScope('profile');
          google.addScope('email');
          this.doProviderLogin(google)
            .then(res => resolve(res), err => reject(err));
        }
          break;

        default: {
          reject("auth.service: provider not available");
        }
          break;
      }
    });
  }

  private doProviderLogin(provider: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .signInWithPopup(provider)
        .then(res => resolve(res), err => reject(err));
    });
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // use email and password
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  doResetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email)
        .then(res => resolve(res), err => reject(err));
    });
  }

  doConfirmPasswordReset(code: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.confirmPasswordReset(code, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++



  doLogout() {
    return new Promise<any>((resolve, reject) => {
      if (this.afAuth.user) {
        this.afAuth.signOut()
          .then(res => {
            // reset all current user Data to null
            // to prevent showing "old data" from logged out user
            // this._currentUserData.next(null);
            resolve(res)
          }, err => reject(err));
      } else {
        reject("no user to logout...");
      }
    });
  }
}
