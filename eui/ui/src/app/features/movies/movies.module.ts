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
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCheckbox} from "@angular/material/checkbox";

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
    MatCheckbox
  ]
})
export class MoviesModule { }
