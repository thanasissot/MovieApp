import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies-old/movies.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ActorsComponent } from './actors/actors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './movies-old/dialog.component'
import {MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';
import {MoviesModule} from "./features/movies/movies.module";
@NgModule({
imports: [
  CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
    MoviesComponent,
    MatTableModule,
    MatProgressSpinnerModule,
     HttpClientModule,
     ActorsComponent,
     DashboardComponent,
  MatDialogActions,
  DialogComponent,
  MoviesModule


  ],
  declarations: [
    AppComponent,

  ],

  providers: [
    provideClientHydration(),
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
