import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
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
  private readonly router = inject(Router);

  protected items: { label: string; action: () => void }[] = [
    { label: "User details", action: () => this.router.navigate(["/user"]) },
    { label: "Logout", action: () => this.authService.logout() },
  ];
}
