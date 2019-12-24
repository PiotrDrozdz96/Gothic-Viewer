export function getVobProp(line: string) {
  const match = line.match(/\s*([^=]+)=([^:]+):(.*)/);
  if (match) {
    const [, key, type, value] = match;
    return {key, type, value: value || ''};
  } else {
    return {key: 'rest', type: '', value: line};
  }
}
