import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { ActorListModule } from '../actor-list/actor-list.module';
import { MovieService } from '../../core/services/movie.service';
import { EuiCardModule } from '@eui/components/eui-card';
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import {MovieAddComponent} from "./movie-add/movie-add.component";

@NgModule({
    imports: [
        SharedModule,
        MovieListRoutingModule,
        EuiCardModule,
        EuiTableModule,
        ActorListModule
    ],
    declarations: [
        MovieListComponent,
        MovieAddComponent
    ],
    providers: [
        MovieService
    ]
})
export class Module {}
