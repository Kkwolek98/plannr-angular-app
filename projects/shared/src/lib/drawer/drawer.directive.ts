import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: "[libDrawer]",
  exportAs: "libDrawer",
  standalone: true,
})
export class DrawerDirective {
  public templateRef = inject(TemplateRef);
}
