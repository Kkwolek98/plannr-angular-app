import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 *
 * @param arrayGetter
 * Function to get the array to compare the control value with
 * @param includesFn
 * Optional function to compare the values of the array (a - control value, b - array item)
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniqueArray(arrayGetter: () => unknown[], includesFn?: (a: any, b: any) => boolean) {
  return (control: AbstractControl): { [key: string]: ValidationErrors } | null => {
    const array = arrayGetter();
    const arrayIncludesFn = includesFn || ((a, b) => a === b);

    const arrayWillBeUnique = array.find((item) => arrayIncludesFn(control.value, item));

    return arrayWillBeUnique ? { uniqueArray: { value: control.value } } : null;
  };
}
