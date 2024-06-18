import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'actors', component: ActorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
