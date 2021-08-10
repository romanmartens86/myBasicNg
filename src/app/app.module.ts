import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularfireModule } from './imports/angularfire.module';
import { AngularmaterialModule } from './imports/angularmaterial.module';

// import QR-Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// private Components
import { environment } from '../environments/environment';
import { LandingComponent } from './books/landing/landing.component';
import { ToolbarComponent } from './books/toolbar/toolbar.component';
import { ScanningComponent } from './books/scanning/scanning.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ToolbarComponent,
    ScanningComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
