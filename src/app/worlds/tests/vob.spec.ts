import { split } from 'lodash';

import { VobType, ZCVob, ZCTriggerList, GInt } from '@worlds/models';

import { simpleVobMock, triggerListVobMock } from './mocks';

const addVobPrefix = (vob: string) => `		childs${vob}`;

describe('Vob', () => {
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
    const lines = split(simpleVobMock, '\n');
    const vob = new ZCVob(
      '12788',
      new GInt('int', '0'),
      new VobType(lines[1]),
      lines.slice(2, -2),
    );

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
        '[]',
      ]);
    });

    it('toString should return correctly string', () => {
      expect(vob.toString()).toEqual(addVobPrefix(simpleVobMock));
    });
  });

  describe('ZCTriggerList', () => {
    const lines = split(triggerListVobMock, '\n');
    const vob = new ZCTriggerList(
      '10960',
      new GInt('int', '0'),
      new VobType(lines[1]),
      lines.slice(2, -2),
    );
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
        '[]',
      ]);
    });
    it('toString should return correctly string', () => {
      expect(vob.toString()).toEqual(addVobPrefix(triggerListVobMock));
    });
  });
});
