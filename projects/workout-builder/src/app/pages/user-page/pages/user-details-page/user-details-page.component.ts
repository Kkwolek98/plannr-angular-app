import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPageComponent { }
