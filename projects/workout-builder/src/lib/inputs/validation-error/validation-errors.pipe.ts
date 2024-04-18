import { Pipe, type PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { createErrorMessageString } from "./validation-errors.messages";

@Pipe({
  name: "appValidationErrors",
  standalone: true,
})
export class ValidationErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors): string[] {
    const errorMessages = Object.entries(errors).map((error) => createErrorMessageString(error));
    return errorMessages;
  }
}
