import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  public settingsGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private settingsService: WorldSettingsService,
  ) {
    this.settingsGroup = formBuilder.group({
      zen: ['', Validators.required],
      image: ['blank', Validators.required],
    });
    this.zenChange();
  }

  private zenChange() {
    this.settingsGroup.get('zen').valueChanges.subscribe(() => {
      this.settingsGroup.get('image').setValue('blank');
    });
  }

  get zenId(): string { return this.settingsGroup.get('zen').value; }
  get imageId(): string { return this.settingsGroup.get('image').value; }
  get zenMapImageIds(): Array<string> { return zenWorlds[this.zenId].mapImageIds; }

  public onSubmit({zen, image}: { zen: string, image: string}) {
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
