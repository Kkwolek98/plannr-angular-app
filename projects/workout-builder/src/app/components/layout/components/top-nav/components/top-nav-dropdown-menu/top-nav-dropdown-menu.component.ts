import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-nav-dropdown-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './top-nav-dropdown-menu.component.html',
  styleUrl: './top-nav-dropdown-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavDropdownMenuComponent { }
