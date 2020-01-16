export const slash = (value: string, separator: string): [string, string] => {
  const index = value.indexOf(separator);
  return index < 0 ? [value, '']
    : [value.substr(0, index), value.substr(index + separator.length)];
};
