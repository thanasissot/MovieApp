import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormsModule as AngularFormsModule,
    FormControl,
    FormGroup,
    Validators,
    NgForm,
    ReactiveFormsModule,
} from '@angular/forms';
import { Movie } from '../../../core/model/movie';
import { MovieService } from '../../../core/services/movie.service';
import { EuiAppShellService } from '@eui/core';
import { EuiGrowlService } from '@eui/core';
import { EuiButtonModule } from "@eui/components/eui-button";
import { EuiGrowlModule } from "@eui/components/eui-growl";

@Component({
  selector: 'app-movie-add',
  // standalone: true,
  // imports: [],
  templateUrl: './movie-add.component.html',
  styleUrl: './movie-add.component.scss'
})
export class MovieAddComponent implements OnInit {
    public isRequired = true;
    public isCompact = true;

    public formValidation: FormGroup;
    public movie: Movie;
    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';

    constructor( private fb: FormBuilder,
                 private movieService: MovieService,
                 private growlService: EuiGrowlService) { }

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            movieName: [{ value: null, disabled: false }, [Validators.required]],
            year: [{ value: null, disabled: false }, [Validators.required]],

        });
    }

    public onSubmitForm() {
        // markFormGroupTouched(this.formValidation.controls);
        this.formValidation.markAllAsTouched();
        if (this.formValidation.status !== 'VALID') {
            alert('something is wrong in new movie input');
        } else {
            let movie = this.formValidation.value as Movie;
            this.movieService.postMovieCreate(movie)
                .subscribe({
                    next: (data) => {
                        console.log(data);
                        this.showGrowlCallback('success', 'Movie created');
                    },
                    error: (er) => {
                        console.log(er);
                        this.showGrowlCallback('error', 'Movie was not created!');
                    }});
        }
    }

    showGrowlCallback(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.growlService.growl({
                severity: type,
                detail: inputMessage },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
            () => {
                alert('This is a click callback');
            },
        );
    }

    public onResetForm() {
        this.formValidation.reset();
    }

    public onSubmitModelTemplate(form: NgForm) {
        console.log(form);
    }


}
