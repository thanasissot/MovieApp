import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorListComponent } from './actor-list.component';

const routes: Routes = [
    { path: '', component: ActorListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class ActorListRoutingModule {}
