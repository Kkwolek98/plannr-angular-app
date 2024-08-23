import { Directive, ElementRef, HostListener, inject, output } from "@angular/core";

@Directive({
  selector: "[libClickedOutside]",
  standalone: true,
})
export class ClickedOutsideDirective {
  private elementRef = inject(ElementRef);

  public libClickedOutside = output<MouseEvent>();

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.libClickedOutside.emit(event);
    }
  }
}
