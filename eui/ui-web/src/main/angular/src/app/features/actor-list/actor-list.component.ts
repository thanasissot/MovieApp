import { Component, OnInit, ViewChild, AfterViewInit, NgModule, Inject, Input } from '@angular/core';
import { EuiTableComponent, EuiTableModule, PaginationEvent, SortEvent } from "@eui/components/eui-table";
import { Actor } from '../../core/model/actor';

@Component({
  selector: 'app-actor-list',
//   standalone: true,
//   imports: [],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss'
})
export class ActorListComponent {
    @ViewChild('euiTable') euiTable: EuiTableComponent;
    @Input() inputFromParent: any;


}
