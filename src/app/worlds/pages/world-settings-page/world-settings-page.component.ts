import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { mapImages, zenWorlds } from '@worlds/consts';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  readonly mapImages = mapImages;
  readonly zenWorlds = zenWorlds;

  public settingsGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsGroup = formBuilder.group({
      zen: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  public onSubmit(sth) {
    console.log(sth);
  }

}
