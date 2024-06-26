import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ActorsComponent } from './actors/actors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';
import {MoviesModule} from "./features/movies/movies.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActorsDisplayComponent } from './features/actors/actors-display/actors-display.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {ActorsModule} from "./features/actors/actors.module";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ActorsComponent,
    DashboardComponent,
    MatDialogActions,
    MoviesModule,
    ActorsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatPaginator,
    MatDivider,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle


  ],
  declarations: [
    AppComponent,

  ],

  providers: [
    provideClientHydration(),
    {
      provide: MatDialogRef,
      useValue: {}
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
