import { NgModule } from '@angular/core';
import { ActorListRoutingModule } from './actor-list-routing.module';
import { ActorListComponent } from './actor-list.component';
import { MovieService } from '../../core/services/movie.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ActorListRoutingModule,
    ],
    declarations: [
        ActorListComponent
    ],
    exports: [
        ActorListComponent
    ]
})
export class ActorListModule {
}
