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
import {ActorService} from "../../core/services/actor.service";
import { EuiPopoverComponent, EuiPopoverModule } from "@eui/components/eui-popover";
@Component({
  selector: 'app-actor-page',
//   standalone: true,
//   imports: [],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.scss'
})
export class ActorPageComponent {
    @ViewChild('euiTable') euiTable: EuiTableComponent;
    @ViewChild('innerEuiTable') innerEuiTable: EuiTableComponent;
    @ViewChild('paginator') paginator: EuiPaginatorComponent;
    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;
    @ViewChild('dialog') dialog: EuiDialogComponent;
    @ViewChild('popover') popover: EuiPopoverComponent;



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
        { prop: 'fullname', label: 'Full Name' },
        { prop: 'movies', label: 'Movies' },
    ];

    constructor(
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        private actorService: ActorService,
        private fb: FormBuilder,
    ) {
        console.log(config);
    }

    ngOnInit(): void {
        this.loading = true;

        this.getData();

        this.form = this.fb.group({
            nameFilter: new FormControl(null),
        });

        this.form.valueChanges.subscribe((value) => {
            let d = [...this.actors];
            if (value.nameFilter !== null) {
                this.strFilter = value.nameFilter;
                d = this.filterOnMovie(value.nameFilter, d);
            }
            this.actors = d;
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

        this.actorService.getActorsPageable(this.page, this.pageSize)
            .pipe(take(1)).
        subscribe({
            next: (data) => {
                console.log(data);
                this.actors = data['content'] as Actor[];
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

    public onAccept(): void {
        // this.movieService.updateMovie(this.movieIdToChangeWatchedStatus, !this.movieWatchedStatusToChange)
        //     .subscribe({
        //         next: () => {
        //             alert('Movie updated');
        //             this.messageBox.closeMessageBox();
        //             this.getData();
        //         },
        //         error: (er) => {
        //             console.log(er);
        //             alert('Something went wrong.');
        //             this.messageBox.closeMessageBox();
        //         }});
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

    private getActors(): void {
        this.loading = true;

        this.actorService.getActorsPageable(this.page, this.pageSize)
            .pipe(take(1))
            .subscribe({
                next: (actors1: Actor[]) => {
                    this.actors = actors1 as Actor[];
                    this.asyncDataSourceLength = this.movies.length;
                    this.loading = false;
                }
            });
    }

    getMovies(actor: Actor): Movie[] {
        console.log(actor);
        return actor.movies;
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
