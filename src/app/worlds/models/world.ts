import { Observable, BehaviorSubject } from 'rxjs';
import _split from 'lodash/split';

import { extractPrefixZenData } from '../utils/extractPrefixZenData';

import { PrefixZenData } from './prefixZenData';
import { Waynet } from './wayNet';
import { Vobtree } from './vobtree';

export class World {
  prefixZenData: PrefixZenData;
  binary: string;
  vobtree: Vobtree;
  waynet: Waynet;
  private init = new BehaviorSubject<boolean>(false);

  constructor(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const [prefixZenData, withoutPrefix] = extractPrefixZenData(reader.result as string);
      if (!prefixZenData.isValid) {
        alert(prefixZenData.error);
      } else {
        this.prefixZenData = prefixZenData;
        const [binary, withoutBinary] = _split(withoutPrefix, '[VobTree % 0 0]', 2);
        const [vobtree, waynet] = _split(withoutBinary, '[WayNet % 0 0]', 2);
        this.binary = binary;
        this.vobtree = new Vobtree(vobtree);
        this.waynet = new Waynet(waynet);
      }
      this.init.next(true);
    };
  }
  afterInit(callback: CallbackFunction) {
    const initObs = this.init.asObservable().subscribe((isInit) => {
      if (isInit) {
        initObs.unsubscribe();
        callback();
      }
    });
  }
}
