import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
} from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { shortId } from "../../../app/utils/short-id";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<SelectData extends []> implements ControlValueAccessor {
  private readonly cdref = inject(ChangeDetectorRef);

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
  public valueKey = input.required<keyof SelectData[0]>();
  public labelKey = input.required<keyof SelectData[0]>();

  inputId: string = shortId("select");
  onChange!: (value: string | number) => void;
  onTouched!: () => void;
  isDisabled: boolean = false;
  value: string | number = "";

  writeValue(value: string | number): void {
    this.value = value;
    this.cdref.detectChanges();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
    console.log(this.inputId);
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
