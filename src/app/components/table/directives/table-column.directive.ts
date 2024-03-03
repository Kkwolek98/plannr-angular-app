import { Directive, TemplateRef, inject, input } from "@angular/core";

@Directive({
  selector: "[appTableColumn]",
  standalone: true,
})
export class TableColumnDirective {
  public templateRef = inject(TemplateRef);
  public columnDef = input.required<string>();
  public headerDef = input.required<string>();
}
