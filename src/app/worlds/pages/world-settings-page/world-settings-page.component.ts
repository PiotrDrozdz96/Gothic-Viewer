import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { mapImages } from '@worlds/consts';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  readonly mapImages = mapImages;

  public settingsGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsGroup = formBuilder.group({
      image: ['', Validators.required],
    });
  }

  public onSubmit(sth) {
    console.log(mapImages[sth.image]);
  }

}
