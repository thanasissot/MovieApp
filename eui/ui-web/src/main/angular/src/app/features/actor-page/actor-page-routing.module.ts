import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorPageComponent } from './actor-page.component';

const routes: Routes = [
    { path: '', component: ActorPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class ActorPageRoutingModule {}
