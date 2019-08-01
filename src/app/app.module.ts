import { NgModule } from '@angular/core';

import { MatButtonModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatTableModule,

    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
