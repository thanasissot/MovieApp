import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
    { path: '', component: MovieListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class MovieListRoutingModule {}
