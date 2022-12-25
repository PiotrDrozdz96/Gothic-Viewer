import { sortBy, trim } from 'lodash';

import { VOB } from '@worlds/consts';
import { Chest, Items } from './g-types';
import { OCMobContainer } from './vob';

import { Vobtree } from './vobtree';

export class WorldItems {
  chest: Chest;
  
  constructor(vobtree: Vobtree) {
    this.chest = this.mergeChests([this.getItemsFromOCItems(vobtree), ...this.getChests(vobtree[VOB.OC_MOB_CONTAINER])])
    this.chest.value = sortBy(this.chest.value, (o) => o.instance);
  }

  private getItemsFromOCItems (vobtree: Vobtree) {
    const oCItems = vobtree[VOB.OC_ITEM] || [];
    const nameInstances = oCItems.map((ocItem) => ocItem.itemInstance.value);
    const countedItems = nameInstances.reduce((acc, instanceName) => {
      const trimmedName = trim(instanceName)
      acc[trimmedName] = (acc[trimmedName] || 0) + 1;
      return acc;
    }, {});
    const chest = new Chest('string', '');
    chest.value = Object.keys(countedItems).map((key) => {
      const items = new Items('');
      items.instance = key;
      items.number = `${countedItems[key]}`;
      return items;
    });
    
    return chest;
  }

  private getChests (containers: OCMobContainer[]): Chest[] {
    return (containers || []).map((container) => container.contains);
  }

  private mergeChests (chests: Chest[]): Chest {
    return chests.reduce((acc, chest) => {
      chest.value.forEach((item) => {
        const itemInChest = acc.value.find(({ instance }) => instance === trim(item.instance));
        if(itemInChest) {
          itemInChest.number = `${Number(itemInChest.number) + Number(item.number)}`;
        } else {
          item.instance = trim(item.instance);
          acc.value.push(item);
        }
      })

      return acc;
    }, new Chest('string', ''));
  }
};
