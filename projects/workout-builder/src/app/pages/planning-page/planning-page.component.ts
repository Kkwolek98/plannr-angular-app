import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "@shared/inputs/button/button.component";

@Component({
  selector: "app-planning-page",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./planning-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningPageComponent {
  private router = inject(Router);

  planNew(): void {
    this.router.navigate(["/planning/new"]);
  }
}
