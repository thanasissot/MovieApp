import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesDisplayComponent } from "./features/movies/movies-display/movies-display.component";
import {ActorsDisplayComponent} from "./features/actors/actors-display/actors-display.component";

const routes: Routes = [
  { path: 'movies', component: MoviesDisplayComponent },
  { path: 'actors', component: ActorsDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
