import { Injectable } from '@angular/core';

import firebase from '@firebase/app-compat';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';


import { booksPersonOwn } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userData firebaseInternal
  private userObserver: Subscription;
  private _currentUser = new BehaviorSubject<any>(null!);

  // userData included in firestore
  private _currentUserData = new BehaviorSubject<booksPersonOwn>(null!);
  private _meRef: AngularFirestoreDocument = null!;



  user: Observable<any>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
    ) {
    this.user = afAuth.authState;

    // subscription has to be unsubscribed onDestroy
    this.userObserver = this.afAuth.user.subscribe(res => {
      if (res && res.uid) {
        console.log("AuthService: Subscription: user is logged in");
        this._currentUser.next(res);

        // also get the current User
        // if it has not allready been downloaded
        if (this._currentUserData.value == null) {
          this.downloadMe();
        }

      } else {
        console.log("AuthService: Subscription: user is not logged in");

        // if user is not logged in anymore delete downloaded data:
        this._currentUser.next(null);
        this._currentUserData.next(null!);
      }
    });
  }


  downloadMe() {
    const me = "users/u_default_groups/own_data/" + this._currentUser.value.uid;
    this._meRef = this.afs.doc<any>(me);
    this._meRef.get().toPromise().then(res => {
      this._currentUserData.next(res.data()!);
    }, err => console.log('authService: error on downloading me data: ' + err));
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
            this._currentUserData.next(null!);
            resolve(res)
          }, err => reject(err));
      } else {
        reject("no user to logout...");
      }
    });
  }
}
