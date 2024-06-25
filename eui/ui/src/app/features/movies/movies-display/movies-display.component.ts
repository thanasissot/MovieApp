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
import {Movie} from "../../../models/movie";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, take, tap} from "rxjs/operators";
import {MovieService} from "../../../services/movie.service";
import {FormBuilder} from "@angular/forms";
import {DialogComponent} from "./dialog-for-movies/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject, from, fromEvent, merge, Observable, of as observableOf} from "rxjs";
import EventEmitter from "events";
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
  data: any;

  dataSource:Movie[] = [];
  @ViewChild(MatTable) table!: MatTable<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  private dialogSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dialogObservable$: Observable<any> = this.dialogSubject.asObservable();

  constructor(
    private movieService: MovieService,
    private sharedService: SharedService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,
  ) {
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
          this.data = data;
          this.dataSource = data['content'] as Movie[];
          this.resultsLength = this.data['totalElements'];

          // this.paginator.pageIndex = 0;
          // this.resultsLength = data['totalElements'];
          // this.cdref.detectChanges();
          // this.table.renderRows();
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
  }

  openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string, movie: Movie): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {movie, "actionDelete":false,
        messageContent: `Update ${movie.movieName} movie Watched status to ${!movie.watched}?`},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(
      (next) => {
        console.log(next)
        this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.movieNameFilter)
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

    dialogRef.afterClosed().subscribe(
      (next) => {
        console.log(next)
        this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.movieNameFilter)
    });
  }

  addData() {
  }



  loadDataOld(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, movieNameFilter: string): void {
    this.loading = true;
    this.movieService.getMoviesPageableAndSortedAndFilteredByMovieName(pageIndex, pageSize, sortColumn || 'id', sortOrder || 'asc', movieNameFilter || '')
      .pipe(take(1)).
    subscribe({
      next: (data: any) => {
        this.dataSource = data['content'] as Movie[];
        this.paginator.pageIndex = 0;
        this.resultsLength = data['totalElements'];
        this.cdref.detectChanges();
        this.table.renderRows();
        this.loading = false;
      },
      error: (er) => {
        console.log(er);
        this.loading = false;
      }});
  }

  loadData1(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, movieNameFilter: string): Observable<Movie[]> {
    return this.movieService.getMoviesPageableAndSortedAndFilteredByMovieName(pageIndex, pageSize, sortColumn || 'id', sortOrder || 'asc', movieNameFilter || '');
  }


}
