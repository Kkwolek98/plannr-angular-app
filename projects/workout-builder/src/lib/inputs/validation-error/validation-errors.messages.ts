export const VALIDATION_ERRORS_MESSAGES: Map<string, string> = new Map([
  ["required", "This field is required"],
  ["minlength", "This field must be at least {requiredLength} characters long"],
  ["maxlength", "This field must be no more than {requiredLength} characters long"],
  ["email", "This field must be a valid email address"],
  ["pattern", "This field must match the pattern {pattern}"],
  ["min", "This field must be greater than or equal to {min}"],
  ["max", "This field must be less than or equal to {max}"],
  ["uniqueArray", "Values must be unique"],
]);

export function createErrorMessageString(
  validationError: [string, Record<string, string | number | boolean>]
): string {
  const [errorName, errorValue] = validationError;
  const errorMessageTemplate = VALIDATION_ERRORS_MESSAGES.get(errorName);

  if (!errorMessageTemplate) {
    return "An unknown error occurred";
  }

  let errorMessage = errorMessageTemplate;

  for (const [key, value] of Object.entries(errorValue)) {
    errorMessage = errorMessage.replace(`{${key}}`, value.toString());
  }

  return errorMessage;
}
