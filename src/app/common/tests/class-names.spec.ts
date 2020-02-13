import { ClassNames } from '@common/utils';
import { join } from 'lodash';

describe('ClassNames', () => {
  describe('omit', () => {
    it(
      'omit with uniq classNames and without second'
      + 'parameter should return the same classNames',
      () => {
        const className = 'class1 class2 class3';
        expect(ClassNames.omit(className)).toEqual(className);
      },
    );
    it(
      'omit with not uniq classNames and without second'
      + 'parametr should return uniq classNames',
      () => {
        expect(ClassNames.omit('class1 class2 class2')).toEqual('class1 class2');
      },
    );
    it('omit should remove omitted classNames', () => {
      expect(ClassNames.omit('class1 class2', ['class2'])).toEqual('class1');
    });
    it('empty className should return empty className', () => {
      expect(ClassNames.omit('', ['class1'])).toEqual('');
    });
  });

  describe('add', () => {
    it('add should correctly add classNames to origin empty className', () => {
      expect(ClassNames.add('', ['class1'])).toEqual('class1');
    });
    it('add should correctly add new classNames', () => {
      expect(ClassNames.add('class1 class2', ['class3'])).toEqual('class1 class2 class3');
    });
    it('add without second parameter should return the same className', () => {
      const className = 'class1 class2';
      expect(ClassNames.add(className)).toEqual(className);
    });
  });
});
