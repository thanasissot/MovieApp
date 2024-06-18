import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
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
import {Movie} from "../models/movie";
import {MovieService} from "../services/movie.service";
import {ActorService} from "../services/actor.service";
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private movieService: MovieService,
              private actorService: ActorService,

              ) {}

  onYesClick(): void {

    if (this.data.actionActor) {
      this.actorService.deleteActor(this.data.actor.id)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (er) => {
            console.log(er);
          }});
      return;
    }

    let movie = this.data.movie as Movie;

    if (this.data.actionDelete === true) {
      this.movieService.deleteMovie(movie.id)
        .subscribe({
          next: () => {
            alert('Movie delete');
          },
          error: (er) => {
            console.log(er);
            alert('Something went wrong.');
          }});
    } else {
      this.movieService.putUpdateMovie(movie.id, !movie.watched)
        .subscribe({
          next: () => {
            alert('Movie updated');
          },
          error: (er) => {
            console.log(er);
            alert('Something went wrong.');
          }});
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
