import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { map } from 'lodash';

import { mapImages, zenWorlds } from '@worlds/consts';
import { WorldSettingsService } from '@worlds/services';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  readonly zenWorlds = zenWorlds;

  public settingsGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private settingsService: WorldSettingsService,
    formBuilder: FormBuilder,
  ) {
    this.settingsGroup = formBuilder.group({
      zen: ['', Validators.required],
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
  get zenMapImageId(): string { return zenWorlds[this.zenId].mapImageId; }
  get additionalZenMapImageIds(): Array<string> {
    return zenWorlds[this.zenId].additionalMapImageIds;
  }

  public onSubmit({ zen }: { zen: string }) {
    this.http.get(
      zenWorlds[zen].zenPath,
      {responseType: 'text'},
    ).subscribe((zenRaw: string) => {
      const {imageUrl, bounds} = mapImages[this.zenMapImageId];
      const images: Array<L.ImageOverlay> = [
        L.imageOverlay(imageUrl, bounds),
        ...map(this.additionalZenMapImageIds, (imageId) => {
          const { imageUrl: additionalUrl, bounds: additionalBounds } = mapImages[imageId];
          return L.imageOverlay(additionalUrl, additionalBounds);
        }),
      ];

      this.settingsService.next({ name: zenWorlds[zen].name , images, zenRaw });
      this.router.navigate(['worlds']);
    });
  }
}
