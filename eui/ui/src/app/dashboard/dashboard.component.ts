import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
    imports: [RouterOutlet,MatButtonModule,BrowserAnimationsModule,
      MatToolbarModule,MatIconModule,MatSidenavModule,RouterLink,MatInputModule,MatFormFieldModule],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
