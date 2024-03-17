import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthenticationService } from "../../../../../../../../services/authentication.service";
import { DropdownItemComponent } from "../../../../../../../dropdown-item/dropdown-item.component";

@Component({
  selector: "app-top-nav-user-profile-dropdown-menu",
  standalone: true,
  templateUrl: "./top-nav-user-profile-dropdown-menu.component.html",
  styleUrl: "./top-nav-user-profile-dropdown-menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DropdownItemComponent],
})
export class TopNavUserProfileDropdownMenuComponent {
  private readonly authService = inject(AuthenticationService);

  protected items: { label: string; action: () => void }[] = [
    { label: "Logout", action: () => this.authService.logout() },
  ];
}
