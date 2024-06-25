import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Movie} from "../../../models/movie";
import {catchError, debounceTime, distinctUntilChanged, take, tap} from "rxjs/operators";
import {MovieService} from "../../../services/movie.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DialogComponent} from "./dialog-for-movies/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {fromEvent} from "rxjs";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrl: './movies-display.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MoviesDisplayComponent implements AfterViewInit, OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Id', 'movieName', 'Year', 'Watched', 'Edit', 'Delete'];
  loading = true;
  resultsLength = 0;
  // pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 5;
  movieNameFilter: string = '';
  movieName = new FormControl('', Validators.required);
  year = new FormControl('', [Validators.required]);
  movieForm: FormGroup;

  dataSource:Movie[] = [];
  @ViewChild(MatTable) table!: MatTable<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private movieService: MovieService,
    private sharedService: SharedService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,
  ) {
    this.movieForm = this._fb.group(
      {
        movieName: this.movieName,
        year: this.year
      });
    this.loading = true;
  }

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.movieNameFilter);
  }

  loadData(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, movieNameFilter: string): void {
    this.movieService
      .getMoviesPageableAndSortedAndFilteredByMovieName(pageIndex, pageSize, sortColumn || 'id', sortOrder || 'asc', movieNameFilter || '')
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.dataSource = data['content'] as Movie[];
          this.resultsLength = data['totalElements'];
        },
        error: (er) => {
          console.log(er);

        },
        complete: () => {
          this.loading = false;
        }}
      );
  }

  onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.movieNameFilter);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (
      this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.movieNameFilter)
    ));

    this.sharedService.dialogObservable$.subscribe((data) => {
      if(data) {
        this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.movieNameFilter)
      }
    });

    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.movieNameFilter = this.input.nativeElement.value;
          this.paginator.pageIndex = 0; // Reset paginator on filter change
        })
      )
      .subscribe({
          next: () => this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.movieNameFilter)
        }
      );
  }

  openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string, movie: Movie): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {movie, "actionDelete":false,
        messageContent: `Update ${movie.movieName} movie Watched status to ${!movie.watched}?`},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, movie: Movie): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {movie, "actionDelete":true,
        messageContent: `Delete ${movie.movieName} movie?`},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  onSubmit(){
    if(this.movieForm.invalid){
      this.movieForm.markAllAsTouched();
    }else{
      let movie = this.movieForm.value as Movie;
      this.movieService.postMovieCreate(movie)
        .subscribe({
          next: () => {
            this.movieForm.reset();
            this.formGroupDirective.resetForm();
            this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.movieNameFilter);
          },
          error: (er) => {
            console.log(er);
            alert(er);
          }});
    }
  }

}
