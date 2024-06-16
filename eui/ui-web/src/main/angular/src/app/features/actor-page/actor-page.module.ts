import { NgModule } from '@angular/core';
import { ActorPageRoutingModule } from './actor-page-routing.module';
import { ActorPageComponent } from './actor-page.component';
import { MovieService } from '../../core/services/movie.service';
import { SharedModule } from '@shared/shared.module';
import {ActorListModule} from "../actor-list/actor-list.module";
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import {MovieSubListComponent} from "./movie-sub-list/movie-sub-list.component";
import {MovieSubListModule} from "./movie-sub-list/movie-sub-list.module";

@NgModule({
    imports: [
        SharedModule,
        ActorPageRoutingModule,
        MovieSubListModule,
        EuiTableModule
    ],
    declarations: [
        ActorPageComponent,
        MovieSubListComponent
    ],
    exports: [

    ],
         providers: [

         ]
})
export class ActorPageModule {
}
