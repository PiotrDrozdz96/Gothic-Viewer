import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { map } from 'lodash';

import { mapImages, zenWorlds, zenWorlds2 } from '@worlds/consts';
import { World } from '@worlds/models';
import { WorldSettingsService } from '@worlds/services';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent {

  readonly zenWorlds = zenWorlds;
  readonly zenWorlds2 = zenWorlds2;
  readonly allZenWorlds = { ...zenWorlds, ...zenWorlds2 };

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
  }

  get zenId(): string { return this.settingsGroup.get('zen').value; }
  get zenMapImageId(): string { return this.allZenWorlds[this.zenId].mapImageId; }
  get additionalZenMapImageIds(): Array<string> {
    return this.allZenWorlds[this.zenId].additionalMapImageIds;
  }

  public onSubmit({ zen }: { zen: string }) {
    this.http.get(
      this.allZenWorlds[zen].zenPath,
      {responseType: 'text'},
    ).subscribe((zenRaw: string) => {
      const {imageUrl, bounds} = mapImages[this.zenMapImageId || 'blank'];
      const images: Array<L.ImageOverlay> = [
        L.imageOverlay(imageUrl, bounds),
        ...map(this.additionalZenMapImageIds, (imageId) => {
          const { imageUrl: additionalUrl, bounds: additionalBounds } = mapImages[imageId];
          return L.imageOverlay(additionalUrl, additionalBounds);
        }),
      ];

      const world = new World(zenRaw);
      if (world.isValid) {
        this.settingsService.next({ name: this.allZenWorlds[zen].name , images, world });
        this.router.navigate(['worlds']);
      }
    });
  }
}
