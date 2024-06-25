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
import {Movie} from "../../../../models/movie";
import {MovieService} from "../../../../services/movie.service";
import {ActorService} from "../../../../services/actor.service";
import EventEmitter from "events";
import {SharedService} from "../../../../services/shared.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions,
    MatDialogContent, MatDialogClose,
  ],

})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  messageContent: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private movieService: MovieService,
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
    let movie = this.data.movie as Movie;

    if (this.data.actionDelete === true) {
      this.handleObserver(this.movieService.deleteMovie(movie.id),
        'Movie delete'
        );
    } else {
      this.handleObserver(this.movieService.putUpdateMovie(movie.id, !movie.watched),
        'Movie updated'
      )
    }
  }

  onNoClick(): void {

  }

}
