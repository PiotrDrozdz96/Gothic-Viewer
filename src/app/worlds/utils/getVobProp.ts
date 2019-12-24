export function getVobProp(line: string) {
  const [, key, type, value] = line.match(/([^=]+)=([^:]+):(.+)/);
  return {key, type, value};
}
