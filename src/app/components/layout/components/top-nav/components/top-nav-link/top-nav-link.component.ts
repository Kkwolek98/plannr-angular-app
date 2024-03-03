import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Link } from "../../../../../../types/layout/link";

@Component({
  selector: "app-top-nav-link",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./top-nav-link.component.html",
  styleUrl: "./top-nav-link.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavLinkComponent {
  public link = input.required<Omit<Link, "children">>();

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  isActive(): boolean {
    return this.link().url === this.router.url;
  }
}
