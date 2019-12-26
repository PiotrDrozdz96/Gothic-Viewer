import _random from 'lodash/random';
import _keys from 'lodash/keys';

import { GInt, GBool, GColor, GColorList, TriggerList, Items, Chest, Rest } from '../models/gTypes';

describe('GTypes', () => {

  describe('GTypeSimilarString', () => {
    const gType = new GInt('int', '0');

    it('should have correctly type', () => {
      expect(gType.type).toEqual('int');
    });
    it('should have correctly value', () => {
      expect(gType.value).toEqual('0');
    });
    it('toString should return correctly string', () => {
      expect(gType.toString()).toEqual('int:0');
    });
  });

  describe('GBool', () => {
    const gType = new GBool('bool', '1');

    it('should have correctly type', () => {
      expect(gType.type).toEqual('bool');
    });
    it('should have save true value', () => {
      expect(gType.value).toEqual(true);
    });
    it('should have save false value', () => {
      const falseGBool = new GBool('bool', '0');
      expect(falseGBool.value).toEqual(false);
    });
    it('toString should return correctly string', () => {
      expect(gType.toString()).toEqual('bool:1');
    });
  });

  describe('GColor', () => {
    const gType = new GColor('color', '211 147 107 255');
    it('should have correctly type', () => {
      expect(gType.type).toEqual('color');
    });
    it('should save value as array of string', () => {
      expect(gType.value).toEqual(['211', '147', '107', '255']);
    });
    it('toString should return correctly string', () => {
      expect(gType.toString()).toEqual('color:211 147 107 255');
    });
  });

  describe('GColorList', () => {
    const gType = new GColorList('string', '(225 197 100) (227 209 106) (223 173 117) ');
    it('should have correctly type', () => {
      expect(gType.type).toEqual('string');
    });
    it('should save value as array of color', () => {
      expect(gType.value).toEqual([
        ['225', '197', '100'],
        ['227', '209', '106'],
        ['223', '173', '117']
      ]);
    });
    it('toString should return correctly string', () => {
      expect(gType.toString()).toEqual('string:(225 197 100) (227 209 106) (223 173 117)');
    });
  });

  describe('TriggerList', () => {
    const lines = [
      'triggerTarget0=string:EVT_CASTLE_FLOOR_0',
      'fireDelay0=float:0',
      'triggerTarget1=string:EVT_CASTLE_FLOOR_1',
      'fireDelay1=float:1',
      'triggerTarget2=string:EVT_CASTLE_FLOOR_2',
      'fireDelay2=float:2',
      'triggerTarget3=string:EVT_CASTLE_FLOOR_3',
      'fireDelay3=float:3',
      'triggerTarget4=string:EVT_CASTLE_FLOOR_4',
      'fireDelay4=float:4',
      'triggerTarget5=string:EVT_CASTLE_FLOOR_5',
      'fireDelay5=float:5',
    ];
    const triggerList = new TriggerList(lines);
    it('value should be array of half lines', () => {
      expect(triggerList.value.length).toEqual(lines.length / 2);
    });
    it('should save array of objects', () => {
      const index = _random(0, 5);
      expect(_keys(triggerList.value[index])).toEqual(['triggerTarget', 'fireDelay']);
    });
    it('should save triggerTarget to correctly object in list', () => {
      const index = _random(0, 5);
      expect(triggerList.value[index].triggerTarget.value).toEqual(`EVT_CASTLE_FLOOR_${index}`);
    });
    it('should save fireDelay to correctly object in list', () => {
      const index = _random(0, 5);
      expect(triggerList.value[index].fireDelay.value).toEqual(`${index}`);
    });
    it('getLines should return the same value as input', () => {
      expect(triggerList.getLines()).toEqual(lines);
    });
    it('toString should return correctly string', () => {
      expect(triggerList.toString()).toEqual(
        '			numTarget=int:6\n' +
        '			triggerTarget0=string:EVT_CASTLE_FLOOR_0\n' +
        '			fireDelay0=float:0\n' +
        '			triggerTarget1=string:EVT_CASTLE_FLOOR_1\n' +
        '			fireDelay1=float:1\n' +
        '			triggerTarget2=string:EVT_CASTLE_FLOOR_2\n' +
        '			fireDelay2=float:2\n' +
        '			triggerTarget3=string:EVT_CASTLE_FLOOR_3\n' +
        '			fireDelay3=float:3\n' +
        '			triggerTarget4=string:EVT_CASTLE_FLOOR_4\n' +
        '			fireDelay4=float:4\n' +
        '			triggerTarget5=string:EVT_CASTLE_FLOOR_5\n' +
        '			fireDelay5=float:5'
      );
    });
  });

  describe('Items', () => {
    describe('single', () => {
      const input = 'ItmiNugget';
      const items = new Items(input);
      it('should have correctly instance', () => {
        expect(items.instance).toEqual(input);
      });
      it('should save 1 as string to number', () => {
        expect(items.number).toEqual('1');
      });
      it('toString should return the same value as input', () => {
        expect(items.toString()).toEqual(input);
      });
    });
    describe('few', () => {
      const input = 'ItmiNugget:10';
      const items = new Items(input);
      it('should have correctly instance', () => {
        expect(items.instance).toEqual('ItmiNugget');
      });
      it('should save 10 as string to number', () => {
        expect(items.number).toEqual('10');
      });
      it('toString should return the same value as input', () => {
        expect(items.toString()).toEqual(input);
      });
    });
  });

  describe('Chest', () => {
    describe('empty', () => {
      const chest = new Chest('string', '');
      it('should have correctly type', () => {
        expect(chest.type).toEqual('string');
      });
      it('should create emptyArray', () => {
        expect(chest.value).toEqual([]);
      });
      it('toString should return empty string', () => {
        expect(chest.toString()).toEqual('');
      });
    });

    describe('single value', () => {
      const input = 'ItMiNugget:10';
      const chest = new Chest('string', input);
      it('should create one element array', () => {
        expect(chest.value.length).toEqual(1);
      });
      it('only one element should have correctly instance', () => {
        expect(chest.value[0].instance).toEqual('ItMiNugget');
      });
      it('only one element should have correctly number', () => {
        expect(chest.value[0].number).toEqual('10');
      });
      it('toString should return the same value as input', () => {
        expect(chest.toString()).toEqual(input);
      });
    });

    describe('few value', () => {
      const input = 'ItFoMutton:4,ItFoCheese:2,ItFoBeer,ItMiNugget:10';
      const chest = new Chest('string', input);
      it('should create four elements array', () => {
        expect(chest.value.length).toEqual(4);
      });
      it('toString should return the same value as input', () => {
        expect(chest.toString()).toEqual(input);
      });
    });
  });

  describe('rest', () => {
    const rest = new Rest();
    rest.push('[visual % 0 0]');
    rest.push('[]');
    rest.push('[ai % 0 0]');
    rest.push('[]');
    it('toString should return correctly value', () => {
      expect(rest.toString()).toEqual('			[visual % 0 0]\n			[]\n			[ai % 0 0]\n			[]');
    });
  });
});
