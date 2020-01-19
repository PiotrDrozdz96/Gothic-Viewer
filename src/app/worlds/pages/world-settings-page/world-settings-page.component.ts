import { Component } from '@angular/core';
import { FormBuilder, FormGroup, CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  public settingsGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsGroup = formBuilder.group({
      image: false,
      radio: [],
    });
  }

  onSubmit(sth) {
    console.log(sth);
  }

}
