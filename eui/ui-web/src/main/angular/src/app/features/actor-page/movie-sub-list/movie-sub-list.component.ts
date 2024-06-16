import { Component, OnInit, ViewChild, AfterViewInit, NgModule, Inject, Input } from '@angular/core';
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import { EuiPopoverComponent, EuiPopoverModule } from "@eui/components/eui-popover";
import { Movie } from '../../../core/model/movie';


@Component({
  selector: 'app-movie-sub-list',
  // standalone: true,
  // imports: [],
  templateUrl: './movie-sub-list.component.html',
  styleUrl: './movie-sub-list.component.scss'
})
export class MovieSubListComponent {
    @ViewChild('innerEuiTable') innerEuiTable: EuiTableComponent;
    @ViewChild('popover') popover: EuiPopoverComponent;
    @Input() inputFromParent: any;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

}
