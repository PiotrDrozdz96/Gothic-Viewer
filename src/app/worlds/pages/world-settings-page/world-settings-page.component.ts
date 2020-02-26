import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { map } from 'lodash';

import { ReadedFile } from '@common/types';
import { mapImages, zenWorlds, zenWorlds2 } from '@worlds/consts';
import { World } from '@worlds/models';
import { WorldSettingsService } from '@worlds/services';

const UPLOAD_TEXT = 'WGRAJ PLIK';
const OWN_FILE_OPTION = 'ownFileOption';

@Component({
  selector: 'app-world-settings-page',
  templateUrl: './world-settings-page.component.html',
  styleUrls: ['./world-settings-page.component.scss'],
})
export class WorldSettingsPageComponent implements OnDestroy {

  readonly zenWorlds = zenWorlds;
  readonly zenWorlds2 = zenWorlds2;
  readonly OWN_FILE_OPTION = OWN_FILE_OPTION;
  readonly allZenWorlds = { ...zenWorlds, ...zenWorlds2 };

  public settingsGroup: FormGroup;
  public uploadText = UPLOAD_TEXT;

  private zenFieldSub: Subscription;
  private uploadedZen: string;

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
    this.zenFieldSub = this.zenField.valueChanges.subscribe((zenId) => {
      if ( zenId !== OWN_FILE_OPTION ) { this.uploadText = UPLOAD_TEXT; }
    });
  }

  ngOnDestroy() {
    this.zenFieldSub.unsubscribe();
  }

  get zenField(): AbstractControl { return this.settingsGroup.get('zen'); }
  get zenId(): string { return this.zenField.value; }
  get isOwnFile(): boolean { return this.zenId === OWN_FILE_OPTION; }
  get zenMapImageId(): string {
    return this.allZenWorlds[this.isOwnFile ? this.uploadText : this.zenId].mapImageId;
  }
  get additionalZenMapImageIds(): Array<string> {
    return this.allZenWorlds[this.isOwnFile ? this.uploadText : this.zenId].additionalMapImageIds;
  }

  public onSubmit() {
    const {imageUrl, bounds} = mapImages[this.zenMapImageId || 'blank'];
    const images: Array<L.ImageOverlay> = [
      L.imageOverlay(imageUrl, bounds),
      ...map(this.additionalZenMapImageIds, (imageId) => {
        const { imageUrl: additionalUrl, bounds: additionalBounds } = mapImages[imageId];
        return L.imageOverlay(additionalUrl, additionalBounds);
      }),
    ];

    if (this.isOwnFile) {
      this.sendWorld(this.uploadedZen, images);
    } else {
      this.http.get(
        this.allZenWorlds[this.zenId].zenPath,
        {responseType: 'text'},
      ).subscribe((zenRaw: string) => { this.sendWorld(zenRaw, images); });
    }
  }

  public fileChange({ name, result }: ReadedFile) {
    this.uploadText = name;
    this.zenField.setValue(OWN_FILE_OPTION);
    this.uploadedZen = result;
  }

  private sendWorld(zenRaw: string, images: Array<L.ImageOverlay>) {
    const world = new World(zenRaw);
    if (world.isValid) {
      this.settingsService.next({
        name: this.isOwnFile ? this.uploadText : this.allZenWorlds[this.zenId].name,
        images,
        world,
      });
      this.router.navigate(['worlds']);
    }
  }
}
