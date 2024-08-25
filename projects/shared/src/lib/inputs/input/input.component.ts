import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, input } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { shortId } from "../../utils/short-id";
import { ValidationErrorComponent } from "../validation-error/validation-error.component";

@Component({
  selector: "lib-input",
  standalone: true,
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ValidationErrorComponent],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  private readonly cdref = inject(ChangeDetectorRef);
  public readonly ngControl = inject(NgControl);

  public label = input<string>();
  public labelPosition = input<"top" | "left">("top");
  public placeholder = input<string>();
  public type = input<InputType>();
  public name = input<string>("");
  public displayRequiredAsterisk = input<boolean>(true);
  public autocomplete = input<boolean>(false);
  public inputMode = input<InputMode>();
  public disabled = input<boolean, boolean>(false, {
    transform: (val) => {
      this.setDisabledState(val);
      return val;
    },
  });
  public renderDisabledAsPlaintext = input(false);

  inputId: string = shortId("input");
  onChange!: (value: string | number) => void;
  onTouched!: () => void;
  isDisabled: boolean = false;
  value: string | number = "";
  isRequired: boolean = false;

  get formControl(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.isRequired = !!this.ngControl.control?.hasValidator(Validators.required);
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
