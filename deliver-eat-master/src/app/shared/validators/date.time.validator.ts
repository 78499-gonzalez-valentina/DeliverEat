import { FormControl } from '@angular/forms';
import * as moment from "moment";

export class DateTimeValidator {

  static moreThanToday(control: FormControl): { [p: string]: any } | null {
    let date: string = control.value;
    let today: string = moment().format('YYYY-MM-DD');

    if (date < today)
      return { "moreThanToday": true };

    return null;
  }
}
