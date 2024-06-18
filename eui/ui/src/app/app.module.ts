import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ActorsComponent } from './actors/actors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './movies/dialog.component'
import {MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';
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
