import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {Movie} from "../../../models/movie";
import {MatDialog} from "@angular/material/dialog";
import {Actor} from "../../../models/actor";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MovieService} from "../../../services/movie.service";
import {SharedService} from "../../../services/shared.service";
import {ActorService} from "../../../services/actor.service";
import {debounceTime, distinctUntilChanged, take, tap} from "rxjs/operators";
import {fromEvent} from "rxjs";
import {ActorDialogComponent} from "./dialog-for-actors/dialog.component";

@Component({
  selector: 'app-actors-display',
  templateUrl: './actors-display.component.html',
  styleUrl: './actors-display.component.scss'
})
export class ActorsDisplayComponent implements AfterViewInit, OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Id', 'Name', 'Delete'];
  actors: Actor[] = [];
  loading = true;
  resultsLength = 0;
  // pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 5;
  actorNameFilter: string = '';
  fullname = new FormControl('', Validators.required);
  actorForm: FormGroup;

  dataSource:Actor[] = [];
  @ViewChild(MatTable) table!: MatTable<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private actorService: ActorService,
    private sharedService: SharedService,
    private cdref: ChangeDetectorRef,
    private _fb : FormBuilder,
  ) {
    this.actorForm = this._fb.group(
      {
        fullname: this.fullname,
      });
    this.loading = true;
  }

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.actorNameFilter);
  }

  loadData(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, movieNameFilter: string): void {
    this.actorService
      .getActorsPageableAndSortedAndFilteredByFullname(pageIndex, pageSize, sortColumn || 'id', sortOrder || 'asc', movieNameFilter || '')
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.dataSource = data['content'] as Actor[];
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

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (
      this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.actorNameFilter)
    ));

    this.sharedService.dialogObservable$.subscribe((data) => {
      if(data) {
        this.actorForm.reset();
        this.formGroupDirective.resetForm();
        this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.actorNameFilter)
      }
    });

    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.actorNameFilter = this.input.nativeElement.value;
          this.paginator.pageIndex = 0; // Reset paginator on filter change
        })
      )
      .subscribe({
          next: () => this.loadData(this.pageIndex, this.pageSize, this.sort.active || 'id', this.sort.direction || 'asc', this.actorNameFilter)
        }
      );
  }

  onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadData(this.pageIndex, this.pageSize, this.sort?.active, this.sort?.direction, this.actorNameFilter);
  }

  // openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string, actor: Actor): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data: {movie, "actionDelete":false,
  //       messageContent: `Update ${actor.fullname} movie Watched status to ${!movie.watched}?`},
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  //
  // }

  openDialogDeleteActor(enterAnimationDuration: string, exitAnimationDuration: string, actor: Actor): void {
    const dialogRef = this.dialog.open(ActorDialogComponent, {
      data: {actor, "actionDelete":true,
        messageContent: `Delete ${actor.fullname}?`},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  openDialogCreateActor(enterAnimationDuration: string, exitAnimationDuration: string){
    if(this.actorForm.invalid){
      this.actorForm.markAllAsTouched();
    } else{

      let actor = this.actorForm.value as Actor;
      const dialogRef = this.dialog.open(ActorDialogComponent, {
        data: {actor, "actionCreate":true,
          messageContent: `Create new ${actor.fullname} actor?`},
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });

    }
  }
}
