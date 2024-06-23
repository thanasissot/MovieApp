import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies-old/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { MoviesDisplayComponent } from "./features/movies/movies-display/movies-display.component";

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'movies-new', component: MoviesDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
