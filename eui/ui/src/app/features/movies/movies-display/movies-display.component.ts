import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  inject,
  Input,
  OnInit, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MOVIES} from "../../../models/mock.movies";
import {Movie} from "../../../models/movie";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, take, tap} from "rxjs/operators";
import {MovieService} from "../../../services/movie.service";
import {FormBuilder} from "@angular/forms";
import {DialogComponent} from "./dialog-for-movies/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge, Observable, of as observableOf} from "rxjs";
import EventEmitter from "events";

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrl: './movies-display.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MoviesDisplayComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Id', 'movieName', 'Year', 'Watched', 'Edit', 'Delete'];
  selectedMovie?: Movie;
  loading = true;
  resultsLength = 0;
  // pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 5;
  movieNameFilter: string = '';

  dataSource:Movie[] = [];
  @ViewChild(MatTable) table!: MatTable<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private movieService: MovieService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,
  ) {
  }

  ngAfterViewInit() {
    // Set default pagination and sorting
    // this.loadData(this.pageIndex, this.pageSize, 'id', 'asc');
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.movieNameFilter = this.input.nativeElement.value;
          this.paginator.pageIndex = 0; // Reset paginator on filter change
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.input.nativeElement, 'input').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.paginator.pageIndex = 0)
    ))
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          console.log(this.movieNameFilter)
          return this.movieService.getMoviesPageableAndSortedAndFilteredByMovieName(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.movieNameFilter)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          if (data === null) return [];
          return data;
        })
      )
      .subscribe(data => {
        this.dataSource = data['content'] as Movie[];
        this.resultsLength = data['totalElements'];
        this.table.renderRows();
        this.loading = false;
        this.cdref.detectChanges();
      })
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
  }

  loadData(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string): void {
    this.movieService.getMoviesPageableAndSorted(pageIndex, pageSize, sortColumn || 'id', sortOrder || 'asc')
      .pipe(take(1)).
    subscribe({
      next: (data: any) => {
        // this.dataSource = new MatTableDataSource<Movie>(data['content'] as Movie[]);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.resultsLength = data['totalElements'] as number;
        this.loading = false;
        this.cdref.detectChanges();
        this.table.renderRows();
      },
      error: (er) => {
        console.log(er);
        this.loading = false;
      }});
  }

  pageChangeEvent(event: PageEvent) {
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


}
