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
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {
  MatDialog,
  MatDialogActions,
} from '@angular/material/dialog';
import {DialogComponent} from "./dialog.component";

@Component({
  standalone: true,
  imports: [NgFor,  NgIf, FormsModule,
  MatTableModule, MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle, MatButtonModule,


  ],
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['Id', 'Name', 'Year', 'Watched', 'Edit', 'Delete'];
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

  deleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie.id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (er) => {
          console.log(er);
        }});
  }

  openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string, movie: Movie): void {
    this.dialog.open(DialogComponent, {
      data: {movie, "actionDelete":false},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, movie: Movie): void {
    this.dialog.open(DialogComponent, {
      data: {movie, "actionDelete":true},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }





}
