import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { shortId } from "../../../app/utils/short-id";

@Component({
  selector: "app-toggle",
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  templateUrl: "./toggle.component.html",
  styleUrl: "./toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {
  private readonly cdref = inject(ChangeDetectorRef);

  public name = input<string>("");
  public labelTrue = input<string>("Yes");
  public labelFalse = input<string>("No");
  public labelPosition = input<"top" | "left">("top");

  inputId: string = shortId("toggle");
  onChange!: (value: boolean) => void;
  onTouched!: () => void;
  isDisabled: boolean = false;

  value: boolean = false;

  writeValue(value: boolean): void {
    this.value = value;
    this.cdref.detectChanges();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onModelChange() {
    this.onChange(this.value);
  }

  toggle() {
    if (this.isDisabled) {
      return;
    }
    this.value = !this.value;
    this.onModelChange();
    this.onTouched();
  }
}
