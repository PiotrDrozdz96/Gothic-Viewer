import { FormArray, FormControl } from '@angular/forms';
import { indexOf } from 'lodash';

export const onCheckboxGroupChange = (
  formArray: FormArray,
  {target: { checked, value }}: EventFrom<HTMLInputElement>,
) => {
  if (checked) {
    formArray.push(new FormControl(value));
  } else {
    formArray.removeAt(indexOf(formArray.value, value));
  }
};
