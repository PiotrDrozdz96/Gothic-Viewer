import { trim } from 'lodash';

export const getVobProp = (line: string) => {
  const match = line.match(/\s*([^=]+)=([^:]+):(.*)/);
  if (match) {
    const [, key, type, value] = match;
    return {key, type, value: value || ''};
  } else {
    return {key: 'rest', type: '', value: trim(line)};
  }
};
