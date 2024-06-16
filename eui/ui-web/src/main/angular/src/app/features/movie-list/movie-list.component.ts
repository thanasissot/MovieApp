import { Component, OnInit, ViewChild, AfterViewInit, NgModule, Inject } from '@angular/core';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { take } from 'rxjs/operators';
import { Movie } from '../../core/model/movie';
import { Actor } from '../../core/model/actor';
import { MovieService } from '../../core/services/movie.service';
import { EuiCardModule } from '@eui/components/eui-card';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import { EuiIconModule } from '@eui/components/eui-icon';
import { EuiButtonModule } from "@eui/components/eui-button";
import { EuiMessageBoxComponent, EuiMessageBoxModule } from "@eui/components/eui-message-box";
import { EuiDialogComponent, EuiDialogConfig, EuiDialogModule, EuiDialogService } from "@eui/components/eui-dialog";

@Component({
    templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit, AfterViewInit  {
    @ViewChild('euiTable') euiTable: EuiTableComponent;
    @ViewChild('paginator') paginator: EuiPaginatorComponent;
    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;
    @ViewChild('dialog') dialog: EuiDialogComponent;

    public movies: Movie[] = [];
    public actors: Actor[] = [];
    public strFilter: string;
    public form: FormGroup;
    public movieIdToChangeWatchedStatus: number;
    public movieWatchedStatusToChange: boolean;
    public hasPagination = true;
    public page = 0;
    public pageSize = 5;
    public pageSizeOptions = [1, 2, 4, 5, 10, 25, 100];
    private pagination: PaginationEvent = { page: 0, pageSize: this.pageSize };
    public loading = false;
    public formFilter: FormGroup;


    public asyncDataSource: Movie[] = [];
    public asyncDataSourceLength = 0;

    public paginationCustom: PaginationEvent;

    public sortBy = null;
    public sortDir = 'asc';

    public selectedRows: Movie[] = [];
    public hasSelectionFeature = true;

    public cols = [
            { prop: 'id', label: 'Id' },
            { prop: 'movieName', label: 'Name' },
            { prop: 'year', label: 'Year' },
            { prop: 'watched', label: 'Watched' },
        ];

    constructor(
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        private movieService: MovieService,
        private fb: FormBuilder,
        ) {
        console.log(config);
    }


    ngOnInit(): void {
        this.loading = true;

        this.getData();

        this.form = this.fb.group({
            movieFilter: new FormControl(null),
            yearFilter: new FormControl(null),
            watchedFilter: new FormControl(null)
        });

        this.form.valueChanges.subscribe((value) => {
            let d = [...this.movies];
            if (value.movieFilter !== null) {
                this.strFilter = value.movieFilter;
                d = this.filterOnMovie(value.movieFilter, d);
            }
            if (value.yearFilter !== null) {
                this.strFilter = value.yearFilter;
                d = this.filterOnYear(value.yearFilter, d);
            }
            if (value.watchedFilter !== null) {
                this.strFilter = value.watchedFilter;
                d = this.filterOnWatched(value.watchedFilter, d);
            }

            this.movies = d;
        });
    }

    ngAfterViewInit() {
        this.paginator.pageChange.subscribe((e: PaginationEvent) => {
                this.loading = true;
                this.pagination = e;

                this.page = e.page;
                this.pageSize - e.pageSize;
                this.getData();
            });
     }

     private getData(): void {

         this.movieService.getMoviesPageable(this.page, this.pageSize)
             .pipe(take(1)).
             subscribe({
               next: (data) => {
               console.log(data);
                  this.movies = data['content'] as Movie[];
                  this.asyncDataSourceLength = data['totalElements'];
                  console.log(this.asyncDataSourceLength)
                  this.loading = false;
               },
               error: (er) => {
                 console.log(er);
                 alert('Something went wrong.');
                 this.loading = false;
               }});

        }

    public onFilterChange(e: string): void {
    }

    public onPageChange(e: PaginationEvent): void {
            this.pagination = e;
    }

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public openMessageBox(id: number, watched:boolean): void {
        this.movieIdToChangeWatchedStatus = id;
        this.movieWatchedStatusToChange = watched;
        this.messageBox.openMessageBox();
    }

    public onAccept(): void {
        this.movieService.updateMovie(this.movieIdToChangeWatchedStatus, !this.movieWatchedStatusToChange)
            .subscribe({
              next: () => {
                 alert('Movie updated');
                 this.messageBox.closeMessageBox();
                 this.getData();
              },
              error: (er) => {
                console.log(er);
                alert('Something went wrong.');
                this.messageBox.closeMessageBox();
              }});
    }

    public onDismiss(): void {
        console.log('dismissed');
        this.movieIdToChangeWatchedStatus = null;
        this.movieWatchedStatusToChange = null;
        this.messageBox.closeMessageBox();
    }

    public onAcceptDialog(): void {
    }


    public onChange(e: boolean): void {
        if (e) {
            this.hasSelectionFeature = true;
        } else {
            this.hasSelectionFeature = false;
            this.euiTable.unselectAllRows();
        }
    }

   private initColumnsFilterForm() {
        this.formFilter = this.fb.group({
            fileNameFilter: new FormControl('', {}),

        })
   }

   public getActorsForMovie(id: number) {
        this.movieService.getActorsForMovie(id)
           .subscribe({
                 next: (actors: Actor[]) => {
                    this.actors = actors as Actor[];
                    console.log(this.actors);
                    this.dialog.openDialog();
                 }
           });
   }



   private getMovies(): void {
        this.loading = true;

        this.movieService.getMoviesPageable(this.page, this.pageSize)
            .pipe(take(1))
           .subscribe({
             next: (movies: Movie[]) => {
                this.movies = movies as Movie[];
                this.asyncDataSourceLength = this.movies.length;
                this.loading = false;
             }
           });
   }

    private filterOnMovie(filter: string, data: any): any[] {
        const rows = data.filter((d: any) => d.movieName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
        return rows;
    }
    private filterOnYear(filter: string, data: any): any[] {
        const rows = data.filter((d: any) => d.year.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
        return rows;
    }
    private filterOnWatched(filter: string, data: any): any[] {
       const rows = data.filter((d: any) => d.watched==true);
       return rows;
   }

}
