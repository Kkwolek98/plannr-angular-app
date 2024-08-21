import { Directive, TemplateRef, inject, input } from "@angular/core";

@Directive({
  selector: "[libTableColumn]",
  standalone: true,
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TableColumnDirective<T> {
  public templateRef = inject(TemplateRef);
  public headerDef = input.required<string>();

  static ngTemplateContextGuard<T>(
    dir: TableColumnDirective<T>,
    ctx: unknown
  ): ctx is { $implicit: T; index: number } {
    return true;
  }
}
