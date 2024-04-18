import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: "[appDrawer]",
  exportAs: "appDrawer",
  standalone: true,
})
export class DrawerDirective {
  public templateRef = inject(TemplateRef);
}
