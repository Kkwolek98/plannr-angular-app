import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TagComponent } from "../../tag/tag.component";
import { ButtonComponent } from "../button/button.component";
import { InputComponent } from "../input/input.component";

@Component({
  selector: "app-tag-input",
  standalone: true,
  templateUrl: "./tag-input.component.html",
  styleUrl: "./tag-input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TagComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true,
    },
  ],
})
export class TagInputComponent implements ControlValueAccessor {
  formControl: FormControl<string> = new FormControl("", {
    validators: [Validators.required],
    nonNullable: true,
  });
  value: string[] = [];

  writeValue(value: string[]): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(value: string[]): void {}

  onTouched(): void {}

  addTag(): void {
    this.value = [...this.value, this.formControl.value];
    this.formControl.reset();
    this.onChange(this.value);
  }

  removeTag(tag: string): void {
    this.value = [...this.value.filter((t) => t !== tag)];
    this.onChange(this.value);
  }
}
