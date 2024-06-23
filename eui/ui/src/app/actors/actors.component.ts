import {Component, AfterViewInit, inject} from '@angular/core';
import { Actor } from '../models/actor';
import {MOVIES} from '../models/mock.movies';
import {
  NgFor,  NgIf,
} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActorService } from '../services/actor.service';
import { MatTableModule } from '@angular/material/table';
import { take } from 'rxjs/operators';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import {Movie} from "../models/movie";
import {DialogComponent} from "../movies-old/dialog.component";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss',
    standalone: true,
  imports: [NgFor, NgIf, FormsModule,
    MatTableModule, MatProgressSpinnerModule, ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle, MatButtonModule,
  ],
})
export class ActorsComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Id', 'Name', 'Delete'];

  actors: Actor[] = [];
    selectedActor?: Actor;
    onSelect(actor: Actor): void {
      this.selectedActor = actor;
    }
    loading = true;
  actorForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
  });


    constructor(
      private actorService: ActorService,
      private cdref: ChangeDetectorRef,
      private _fb : FormBuilder,

    ) {

    }

    ngAfterViewInit() {
        this.actorService.getActorsPageable(0, 10)
              .pipe(take(1)).
              subscribe({
                next: (data: any) => {
                   console.log(data);
                   this.actors = data['content'] as Actor[];
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
    if(this.actorForm.invalid){
      this.actorForm.markAllAsTouched();
    }else{
      let actor = this.actorForm.value as Actor;
      console.log("this is your form", this.actorForm);
      this.actorService.postActorCreate(actor)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (er) => {
            console.log(er);
          }});
    }
  }

  deleteActor(actor: Actor) {

  }

  openDialogDeleteActor(enterAnimationDuration: string, exitAnimationDuration: string, actor: Actor) {
    this.dialog.open(DialogComponent, {
      data: {actor, 'actionActor':true },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }



}
