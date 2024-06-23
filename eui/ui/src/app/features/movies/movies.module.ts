import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDisplayComponent } from './movies-display/movies-display.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    MoviesDisplayComponent
  ],
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatProgressSpinner,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatCheckbox,
        MatPaginator,
      MatPaginatorModule,
      MatTableModule,
      MatSortModule,
      MatSort,
    ]
})
export class MoviesModule { }
