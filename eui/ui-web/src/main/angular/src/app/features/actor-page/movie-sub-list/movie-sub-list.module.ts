import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import { EuiPopoverComponent, EuiPopoverModule } from "@eui/components/eui-popover";
import { ActorPageComponent } from '../actor-page.component';
import { SharedModule } from '@shared/shared.module';
import {MovieSubListComponent} from "./movie-sub-list.component";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        EuiTableModule,
        EuiPopoverModule
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class MovieSubListModule {
}
