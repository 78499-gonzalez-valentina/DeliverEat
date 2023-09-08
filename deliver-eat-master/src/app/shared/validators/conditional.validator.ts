import { ValidatorFn } from "@angular/forms";
import { BooleanFn } from "../utils/boolean.fn";

export class ConditionalValidator {

  /**
   * @param predicate
   * @param validator
   * @param errorNamespace optional argument that creates own namespace for the validation error
   */
  static conditionalValidator(predicate: BooleanFn,
                              validator: ValidatorFn,
                              errorNamespace?: string): ValidatorFn {
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      let error = null;
      if (predicate()) {
        error = validator(formControl);
      }
      if (errorNamespace && error) {
        const customError = {};
        // @ts-ignore
        customError[errorNamespace] = error;
        error = customError
      }
      return error;
    })
  }
}
