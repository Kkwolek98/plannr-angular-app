import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { map, scan } from "rxjs";
import { PlanningTab } from "../../enums/planning-tab.enum";

@Component({
  selector: "app-plan-new-navigation",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./plan-new-navigation.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewNavigationComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  PlanningTab = PlanningTab;
  planningTabsArray = Object.values(PlanningTab);

  currentTab = toSignal<PlanningTab>(this.activatedRoute.queryParams.pipe(map((params) => params["tab"])));
  visitedTabs = toSignal<PlanningTab[]>(
    toObservable(this.currentTab).pipe(
      scan((acc: PlanningTab[], currentTab: PlanningTab | undefined) => {
        if (!currentTab) {
          return acc;
        }
        const visitedTabs = [...acc, currentTab];
        // match sorting of this to how tabs are presented
        const sortedSetArray = [...new Set(visitedTabs)].sort(
          (a, b) => this.planningTabsArray.indexOf(a) - this.planningTabsArray.indexOf(b)
        );
        return sortedSetArray;
      }, [])
    )
  );
  isLastTab = computed(() => {
    const currentTabIndex = this.planningTabsArray.indexOf(this.currentTab()!);
    return currentTabIndex === this.planningTabsArray.length - 1;
  });

  ngOnInit(): void {
    this.changeTab(PlanningTab.Group);
  }

  public changeTab(tab: PlanningTab): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { tab } });
  }

  public next(): void {
    const currentTabIndex = this.planningTabsArray.indexOf(this.currentTab()!);
    const nextTab = this.planningTabsArray[currentTabIndex + 1];

    if (!nextTab) {
      return;
    }

    this.changeTab(nextTab);
  }
}
