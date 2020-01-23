import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { WorldSettings } from '@worlds/types';

@Injectable({
  providedIn: 'root',
})
export class WorldSettingsService {

  private settings = new BehaviorSubject<WorldSettings>(undefined);
  public isValid = false;

  constructor() { }

  public next(settings: WorldSettings) {
    this.settings.next(settings);
    this.isValid = true;
  }

  public get(): Observable<WorldSettings> {
    return this.settings.asObservable();
  }
}
