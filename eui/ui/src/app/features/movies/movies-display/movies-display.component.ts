import {AfterViewInit, ChangeDetectorRef, Component, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MOVIES} from "../../../models/mock.movies";
import {Movie} from "../../../models/movie";
import {take} from "rxjs/operators";
import {MovieService} from "../../../services/movie.service";
import {FormBuilder} from "@angular/forms";
import {DialogComponent} from "../../../movies-old/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrl: './movies-display.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MoviesDisplayComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Id', 'Name', 'Year', 'Watched', 'Edit', 'Delete'];
  movies = MOVIES;
  selectedMovie?: Movie;
  loading = true;

  @ViewChild(MatTable) table!: MatTable<Movie>;

  constructor(
    private movieService: MovieService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,
  ) {}

  ngAfterViewInit() {
    this.movieService.getMoviesPageable(0, 10)
      .pipe(take(1)).
    subscribe({
      next: (data: any) => {
        console.log(data);
        this.movies = data['content'] as Movie[];
        this.loading = false;
        this.cdref.detectChanges();
      },
      error: (er) => {
        console.log(er);
        this.loading = false;
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

  addData() {
    this.movies.push(MOVIES[1]);
    this.table.renderRows();
  }

}
