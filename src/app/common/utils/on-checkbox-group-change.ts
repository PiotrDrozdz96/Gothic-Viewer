import { FormArray, FormControl } from '@angular/forms';
import { findIndex } from 'lodash';

export const onCheckboxGroupChange = (
  formArray: FormArray,
  {target: { checked, value }}: EventFrom<HTMLInputElement>,
) => {
  if (checked) {
    formArray.push(new FormControl(value));
  } else {
    formArray.removeAt(findIndex(formArray.value, (formValue: string) => (
      formValue === value
    )));
  }
};
