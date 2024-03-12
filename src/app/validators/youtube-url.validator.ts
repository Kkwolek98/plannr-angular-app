import { AbstractControl, ValidationErrors } from "@angular/forms";

export function youtubeUrlValidator(control: AbstractControl<string>): ValidationErrors | null {
  const startsWithYoutube = control.value.startsWith("https://www.youtube.com");
  return startsWithYoutube ? { startsWithYoutube: { value: control.value } } : null;
}
