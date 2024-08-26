import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Link } from "../../../../../../../shared/src/lib/types/layout/link";
import { TopNavDropdownMenuComponent } from "./components/top-nav-dropdown-menu/top-nav-dropdown-menu.component";
import { TopNavLinkComponent } from "./components/top-nav-link/top-nav-link.component";
import { TopNavUserProfileComponent } from "./components/top-nav-user-profile/top-nav-user-profile.component";

@Component({
  selector: "app-top-nav",
  standalone: true,
  templateUrl: "./top-nav.component.html",
  styleUrl: "./top-nav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopNavLinkComponent, TopNavDropdownMenuComponent, CommonModule, TopNavUserProfileComponent],
})
export class TopNavComponent {
  readonly links: Link[] = [
    {
      url: "/exercises",
      display: "Exercises",
    },
    {
      url: "/workout-templates",
      display: "Workout Templates",
    },
  ] as const;
}
