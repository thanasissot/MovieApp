import { Component, AfterViewInit } from '@angular/core';
import { Movie } from '../models/movie';
import {MOVIES} from '../models/mock.movies';
import {
  NgFor,  NgIf,
} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { MatTableModule } from '@angular/material/table';
import { take } from 'rxjs/operators';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NgFor,  NgIf, FormsModule,
  MatTableModule, MatProgressSpinnerModule,
    ReactiveFormsModule,

  ],
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Id', 'Name', 'Year', 'Watched'];
  movies = MOVIES;
  selectedMovie?: Movie;
  movieForm = new FormGroup({
    movieName: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required]),
  });

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
  loading = true;

  constructor(
    private movieService: MovieService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,

  ) {

  }

  ngAfterViewInit() {
    this.movieService.getMoviesPageable(0, 10)
          .pipe(take(1)).
          subscribe({
            next: (data: any) => {
               console.log(data);
               this.movies = data['content'] as Movie[];
//                this.asyncDataSourceLength = data['totalElements'];
//                console.log(this.asyncDataSourceLength)
               this.loading = false;
               this.cdref.detectChanges();
            },
            error: (er) => {
              console.log(er);
              this.loading = false;
            }});
  }


  onSubmit(){
    if(this.movieForm.invalid){
      this.movieForm.markAllAsTouched();
    }else{
      let movie = this.movieForm.value as Movie;
      console.log("this is your form", this.movieForm);
      this.movieService.postMovieCreate(movie)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (er) => {
            console.log(er);
          }});
    }
  }


}
