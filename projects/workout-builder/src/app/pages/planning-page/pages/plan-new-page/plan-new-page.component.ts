import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { map, scan } from "rxjs";
import { PlanningTab } from "./enums/planning-tab.enum";

@Component({
  selector: "app-plan-new-page",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./plan-new-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  PlanningTab = PlanningTab;

  currentTab = toSignal<PlanningTab>(this.activatedRoute.queryParams.pipe(map((params) => params["tab"])));
  visitedTabs = toSignal<PlanningTab[]>(
    toObservable(this.currentTab).pipe(
      scan((acc: PlanningTab[], currentTab: PlanningTab | undefined) => {
        if (!currentTab) {
          return acc;
        }
        const planningTabValues = Object.values(PlanningTab);
        const visitedTabs = [...acc, currentTab];
        // match sorting of this to how tabs are presented
        const sortedSetArray = [...new Set(visitedTabs)].sort(
          (a, b) => planningTabValues.indexOf(a) - planningTabValues.indexOf(b)
        );
        return sortedSetArray;
      }, [])
    )
  );

  ngOnInit(): void {
    this.changeTab(PlanningTab.Group);
  }

  changeTab(tab: PlanningTab): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { tab } });
  }
}
