import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { onCheckboxGroupChange } from '@common/utils';
import { mapImages, zenWorlds } from '@worlds/consts';
import { WorldSettingsService } from '@worlds/services';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  readonly mapImages = mapImages;
  readonly zenWorlds = zenWorlds;
  readonly onCheckboxGroupChange = onCheckboxGroupChange;

  public settingsGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private settingsService: WorldSettingsService,
    formBuilder: FormBuilder,
  ) {
    this.settingsGroup = formBuilder.group({
      zen: ['', Validators.required],
      image: ['blank', Validators.required],
      additionalImages: new FormArray([]),
    });
    this.zenChange();
  }

  private zenChange() {
    this.settingsGroup.get('zen').valueChanges.subscribe(() => {
      this.settingsGroup.get('image').setValue('blank');
      const formArray: FormArray = this.settingsGroup.get('additionalImages') as FormArray;
      while (formArray.length) {
        formArray.removeAt(0);
      }
    });
  }

  get zenId(): string { return this.settingsGroup.get('zen').value; }
  get imageId(): string { return this.settingsGroup.get('image').value; }
  get additionalImages(): Array<string> { return this.settingsGroup.get('additionalImages').value; }
  get zenMapImageIds(): Array<string> { return zenWorlds[this.zenId].mapImageIds; }
  get additionalZenMapImageIds(): Array<string> {
    return zenWorlds[this.zenId].additionalMapImageIds;
  }

  public onSubmit({zen, image, additionalImages}:
    { zen: string, image: string, additionalImages: Array<string> }) {
    this.http.get(
      zenWorlds[zen].zenPath,
      {responseType: 'text'},
    ).subscribe((zenRaw: string) => {
      const {imageUrl, bounds} = mapImages[image];
      this.settingsService.next({ name: zenWorlds[zen].name , imageUrl, bounds, zenRaw });
      this.router.navigate(['worlds']);
    });
  }
}
