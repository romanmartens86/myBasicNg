import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularfireModule } from './imports/angularfire.module';
import { AngularmaterialModule } from './imports/angularmaterial.module';

// import QR-Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// private Services
import { AuthService } from './services/auth.service';

// private Components
import { environment } from '../environments/environment';
import { LandingComponent } from './books/landing/landing.component';
import { ToolbarComponent } from './books/toolbar/toolbar.component';
import { ScanningComponent } from './books/scanning/scanning.component';
import { AuthComponent } from './books/auth/auth.component';
import { LoginComponent } from './books/auth/login/login.component';
import { RegisterComponent } from './books/auth/register/register.component';
import { SocialComponent } from './books/auth/social/social.component';
import { ThanksComponent } from './books/overhead/thanks/thanks.component';
import { LegalComponent } from './books/overhead/legal/legal.component';
import { UserComponent } from './books/auth/user/user.component';
import { MeComponent } from './books/auth/user/me/me.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ToolbarComponent,
    ScanningComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    SocialComponent,
    ThanksComponent,
    LegalComponent,
    UserComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularfireModule,
    AngularmaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    ZXingScannerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
