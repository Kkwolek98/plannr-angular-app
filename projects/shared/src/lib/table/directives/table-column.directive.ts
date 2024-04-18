import { Directive, TemplateRef, inject, input } from "@angular/core";

@Directive({
  selector: "[libTableColumn]",
  standalone: true,
})
export class TableColumnDirective {
  public templateRef = inject(TemplateRef);
  public headerDef = input.required<string>();
}
