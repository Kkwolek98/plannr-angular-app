import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Signal,
  computed,
  inject,
  input,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter, map, startWith } from "rxjs";
import { Link } from "../../../../../../../../../shared/src/lib/types/layout/link";

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
  readonly cdref = inject(ChangeDetectorRef);

  readonly currentLink: Signal<string | undefined> = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url || ""),
      startWith(this.router.url)
    )
  );

  readonly isActive = computed(() => {
    const linkSegments = this.link().url.split("/");
    const currentLinkSegments = this.currentLink()!.split("/");
    return linkSegments[1] === currentLinkSegments[1];
  });
}
