import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ClickedOutsideDirective } from "@shared/clicked-outside-directive/clicked-outside.directive";
import { TopNavUserProfileDropdownMenuComponent } from "./components/top-nav-user-profile-dropdown-menu/top-nav-user-profile-dropdown-menu.component";

@Component({
  selector: "app-top-nav-user-profile",
  standalone: true,
  templateUrl: "./top-nav-user-profile.component.html",
  styleUrl: "./top-nav-user-profile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TopNavUserProfileDropdownMenuComponent, ClickedOutsideDirective],
})
export class TopNavUserProfileComponent {
  protected isMenuVisible = signal(false);
}
