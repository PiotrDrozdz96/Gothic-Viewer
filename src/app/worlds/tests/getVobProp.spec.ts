import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getVobProp } from '../utils/getVobProp';

describe('GetVobProp', () => {

  describe('simple prop', () => {
    const line = '			pack=int:0';
    const { key, type, value } = getVobProp(line);
    it('should return correctly key', () => {
      expect(key).toEqual('pack');
    });
    it('should return correctly type', () => {
      expect(type).toEqual('int');
    });
    it('should return correctly value', () => {
      expect(value).toEqual('0');
    });
  });

  describe('empty value', () => {
    const line = '			rangeAniScale=string:';
    const { key, type, value } = getVobProp(line);
    it('should return correctly key', () => {
      expect(key).toEqual('rangeAniScale');
    });
    it('should return correctly type', () => {
      expect(type).toEqual('string');
    });
    it('should return empty value', () => {
      expect(value).toEqual('');
    });
  });

  describe('value with spaces', () => {
    const line = '			trafoOSToWSPos=vec3:-33267.8438 2936.19434 -25089.3262';
    const { key, type, value } = getVobProp(line);
    it('should return correctly key', () => {
      expect(key).toEqual('trafoOSToWSPos');
    });
    it('should return correctly type', () => {
      expect(type).toEqual('vec3');
    });
    it('should return correctly value', () => {
      expect(value).toEqual('-33267.8438 2936.19434 -25089.3262');
    });
  });

  describe('rest', () => {
    const line = '			[visual % 0 0]';
    const { key, type, value } = getVobProp(line);
    it('should return rest key', () => {
      expect(key).toEqual('rest');
    });
    it('should return empty type', () => {
      expect(type).toEqual('');
    });
    it('should return trimed line', () => {
      expect(value).toEqual('[visual % 0 0]');
    });
  });

});
