import { VobType, ZCVob, ZCTriggerList } from '../models/vob';
import { getVob } from '../utils/get-vob';

import simpleVob from './mocks/simpleVob.mock';
import triggerListVob from './mocks/triggerListVob.mock';

const addVobPrefix = (vob: string) => `		childs${vob}`;

describe('GetVob', () => {
  describe('VobType', () => {
    describe('basic VobType', () => {
      const line = '		[% zCVob 12289 9945]';
      const vobType = new VobType(line);
      it('type should be empty string', () => {
        expect(vobType.type).toEqual('');
      });
      it('first value should be 12289', () => {
        expect(vobType.firstValue).toEqual('12289');
      });
      it('second value should be 9945', () => {
        expect(vobType.secondValue).toEqual('9945');
      });
      it('toString should return the same line', () => {
        expect(vobType.toString()).toEqual(line);
      });
    });

    describe('with colon', () => {
      const line = '		[% zCVobSound:zCVob 12289 9945]';
      const vobType = new VobType(line);
      it('should save correctly type', () => {
        expect(vobType.type).toEqual('zCVobSound:');
      });
      it('first value should be 12289', () => {
        expect(vobType.firstValue).toEqual('12289');
      });
      it('second value should be 9945', () => {
        expect(vobType.secondValue).toEqual('9945');
      });
      it('toString should return the same line', () => {
        expect(vobType.toString()).toEqual(line);
      });
    });
  });

  describe('ZCVob', () => {
    const vob = getVob(simpleVob);
    it('should save correctly index', () => {
      expect(vob.index).toEqual('12788');
    });
    it('should save correctly unknown value', () => {
      expect(vob.unknownValue.value).toEqual('0');
    });
    it('should be return good instance', () => {
      expect(vob.constructor).toEqual(ZCVob);
    });
    it('should save correctly rest', () => {
      expect(vob.rest.value).toEqual([
        '[visual § 0 9043]',
        '[]',
        '[ai % 0 0]',
        '[]'
      ]);
    });
    it('toString should return correctly string', () => {
      expect(vob.toString()).toEqual(addVobPrefix(simpleVob));
    });
  });

  describe('ZCTriggerList', () => {
    const vob = getVob(triggerListVob);
    it('should save correctly index', () => {
      expect(vob.index).toEqual('10960');
    });
    it('should save correctly unknown value', () => {
      expect(vob.unknownValue.value).toEqual('0');
    });
    it('should be return good instance', () => {
      expect(vob.constructor).toEqual(ZCTriggerList);
    });
    it('should save correctly rest', () => {
      expect(vob.rest.value).toEqual([
        '[visual % 0 0]',
        '[]',
        '[ai % 0 0]',
        '[]'
      ]);
    });
    it('toString should return correctly string', () => {
      expect(vob.toString()).toEqual(addVobPrefix(triggerListVob));
    });
  });
});
