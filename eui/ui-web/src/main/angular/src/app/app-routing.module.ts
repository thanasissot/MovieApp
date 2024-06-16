import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
    { path: 'index.jsp', redirectTo: 'screen/home' },
    { path: 'screen/home', loadChildren: () => import('./features/movie-list/movie-list.module').then(m => m.Module) },
    { path: 'screen/actor-page', loadChildren: () => import('./features/actor-page/actor-page.module').then(m => m.ActorPageModule) },
    { path: 'screen/module2', loadChildren: () => import('./features/module2/module2.module').then(m => m.Module) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class AppRoutingModule {}
