import {ChangeDetectionStrategy, Component, Inject, inject, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import {ActorService} from "../../../../services/actor.service";
import EventEmitter from "events";
import {SharedService} from "../../../../services/shared.service";
import {Observable} from "rxjs";
import {Actor} from "../../../../models/actor";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions,
    MatDialogContent, MatDialogClose,
  ],

})
export class ActorDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ActorDialogComponent>);
  messageContent: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private actorService: ActorService,
              private sharedService: SharedService,

              ) {
    this.messageContent = data.messageContent;
  }

  handleObserver(toSubscribe: Observable<any>, msgOk: string): void {
    toSubscribe.subscribe({
      next: (data) => {
        this.sharedService.setDialogObservable$(true);
        alert(msgOk);
      },
      error: (er) => {
        console.log(er);
        this.sharedService.setDialogObservable$(false);
      }})
  }

  onYesClick(): void {
    let actor = this.data.actor as Actor;

    if (this.data.actionDelete === true) {
      this.handleObserver(this.actorService.deleteActor(actor.id),
        'Movie delete'
        );
    }
    // else if (this.data.actionDelete === false) {
    //   this.handleObserver(this.movieService.putUpdateMovie(movie.id, !movie.watched),
    //     'Movie updated'
    //   )
    // }
    else if (this.data.actionCreate) {
      this.handleObserver(this.actorService.postActorCreate(actor),
        'Actor Created'
      )
    }
  }

  onNoClick(): void {

  }

}
