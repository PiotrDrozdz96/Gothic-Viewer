import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { WorldSettings } from '@worlds/types';

@Injectable({
  providedIn: 'root',
})
export class WorldSettingsService {

  private settings = new BehaviorSubject<WorldSettings>(undefined);

  constructor() { }

  public next(settings: WorldSettings) {
    this.settings.next(settings);
  }

  public get(): Observable<WorldSettings> {
    return this.settings.asObservable();
  }
}
