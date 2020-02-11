import { split, without, join, uniq, compact } from 'lodash';

export class ClassNames {
  public static omit(className: string, toOmit: Array<string> = []): string {
    return join(uniq(compact(without(split(className, ' '), ...toOmit))), ' ');
  }

  public static add(className: string, toAdd: Array<string> = []): string {
    return join(uniq(compact([...split(className, ' '), ...toAdd])), ' ');
  }
}
