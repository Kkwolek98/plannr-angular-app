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
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private readonly cdref = inject(ChangeDetectorRef);

  public label = input<string>();
  public labelPosition = input<"top" | "left">("top");
  public placeholder = input<string>();
  public type = input<InputType>();
  public name = input<string>("");
  public autocomplete = input<boolean>(false);
  public inputMode = input<InputMode>();
  public disabled = input<boolean, boolean>(false, {
    transform: (val) => {
      this.setDisabledState(val);
      return val;
    },
  });

  inputId: string = shortId("input");
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

type InputMode = "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
type InputType =
  | "text"
  | "password"
  | "checkbox"
  | "radio"
  | "number"
  | "date"
  | "time"
  | "email"
  | "tel"
  | "url"
  | "search"
  | "file"
  | "color"
  | "range"
  | "datetime-local"
  | "month"
  | "week"
  | "hidden"
  | "textarea";
