import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-workout-display-current-set',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './workout-display-current-set.component.html',
  styleUrl: './workout-display-current-set.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplayCurrentSetComponent { }
