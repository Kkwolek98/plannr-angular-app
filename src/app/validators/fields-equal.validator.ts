import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fieldsEqual(...fields: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: ValidationErrors } | null => {
    let prev: unknown;

    for (let i = 0; i < fields.length; i++) {
      const controlValue = control.get(fields[i])?.value;

      if (prev !== controlValue && i !== 0) {
        return { fieldsEqual: { previous: prev, current: controlValue } };
      }

      prev = controlValue;
    }

    return null;
  };
}
