import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Link } from "../../../../types/layout/link";
import { TopNavDropdownMenuComponent } from "./components/top-nav-dropdown-menu/top-nav-dropdown-menu.component";
import { TopNavLinkComponent } from "./components/top-nav-link/top-nav-link.component";

@Component({
  selector: "app-top-nav",
  standalone: true,
  imports: [TopNavLinkComponent, TopNavDropdownMenuComponent, CommonModule],
  templateUrl: "./top-nav.component.html",
  styleUrl: "./top-nav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent {
  readonly links: Link[] = [
    {
      url: "exercises",
      display: "Exercises",
    },
    {
      url: "workouts",
      display: "Workouts",
    },
  ] as const;
}
