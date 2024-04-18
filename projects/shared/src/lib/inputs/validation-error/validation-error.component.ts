import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";
import { ValidationErrorsPipe } from "./validation-errors.pipe";

@Component({
  selector: "lib-validation-error",
  standalone: true,
  imports: [CommonModule, ValidationErrorsPipe],
  templateUrl: "./validation-error.component.html",
  styleUrl: "./validation-error.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush, // TODO: figure out how to make it work
})
export class ValidationErrorComponent implements ControlValueAccessor {
  ngControl = inject(NgControl);
  private readonly cdref = inject(ChangeDetectorRef);

  get formControl(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
  setDisabledState(): void {}
}
