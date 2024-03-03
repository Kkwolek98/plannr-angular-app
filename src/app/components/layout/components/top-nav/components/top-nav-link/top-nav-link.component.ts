import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
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
}
