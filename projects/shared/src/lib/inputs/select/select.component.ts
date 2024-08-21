import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from "@angular/core";
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { shortId } from "../../utils/short-id";
import { ValidationErrorComponent } from "../validation-error/validation-error.component";

@Component({
  selector: "lib-select",
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationErrorComponent, ReactiveFormsModule],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<SelectData extends { [key: string | number | symbol]: unknown }[]>
  implements ControlValueAccessor
{
  private readonly cdref = inject(ChangeDetectorRef);
  readonly ngControl = inject(NgControl);

  public name = input<string>("");
  public label = input<string>();
  public labelPosition = input<"top" | "left">("top");
  public placeholder = input<string>();
  public disabled = input<boolean, boolean>(false, {
    transform: (val) => {
      this.setDisabledState(val);
      return val;
    },
  });

  public data = input.required<SelectData>();
  public valueKey = input.required<keyof SelectData[number]>();
  public labelKey = input.required<keyof SelectData[number]>();

  inputId: string = shortId("select");
  onChange!: (value: string | number) => void;
  onTouched!: () => void;
  isDisabled: boolean = false;
  value: string | number = "";

  get formControl(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  writeValue(value: string | number): void {
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
    this.cdref.detectChanges();
  }

  onModelChange() {
    this.onChange(this.value);
  }
}
