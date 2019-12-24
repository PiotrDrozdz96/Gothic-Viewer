import * as moment from 'moment';
import _findIndex from 'lodash/findIndex';
import _join from 'lodash/join';

const zenGin = 'ZenGin Archive';
const genericArchive = 'zCArchiverGeneric';
const ASCII = 'ASCII';
const END = 'END';
const gothicDateFormat = 'DD.MM.YYYY HH:mm:ss';

const somethingWrongMessage = (field: string): string => (
  `Coś jest nie tak z wartością "${field}"`
);
const errorMessages = [
  'To nie jest archiwum ZenGin',
  somethingWrongMessage('ver'),
  'Plik musi być zapisany w formacie ASCII, przekonwertuj świat w programie Spacer',
  'Plik musi być zapisany w formacie ASCII, przekonwertuj świat w programie Spacer',
  somethingWrongMessage('saveGame'),
  somethingWrongMessage('date'),
  somethingWrongMessage('user'),
  'Niewłaściwy format pliku',
  somethingWrongMessage('objects'),
  'Niewłaściwy format pliku',
  'Niewłaściwy format pliku',
];

export class PrefixZenData {
  ver: string;
  saveGame: string;
  date: moment.Moment;
  user: string;
  objects: string;

  isValid = true;
  error: string;

  constructor(prefix: Array<string>) {

    const converters: Array<(line: string) => boolean> = [
      (line) => line !== zenGin,
      (line) => {
        const match = line.match(/(ver )(\d+\s*)/);
        if (match) {
          this.ver = match[2];
        } else { return true; }
      },
      (line) => line !== genericArchive,
      (line) => line !== ASCII,
      (line) => {
        const match = line.match(/(saveGame )(\d+\s*)/);
        if (match) {
          this.saveGame = match[2];
        } else { return true; }
      },
      (line) => {
        const match = line.match(/(date )(.+)/);
        if (match) {
          const date = moment(match[2], gothicDateFormat);
          if (date.isValid) {
            this.date = date;
          } else { return true; }
        } else { return true; }
      },
      (line) => {
        const match = line.match(/(user )(.+)/);
        if (match) {
          this.user = match[2];
        } else { return true; }
      },
      (line) => line !== END,
      (line) => {
        const match = line.match(/(objects )(\d+\s*)/);
        if (match) {
          this.objects = match[2];
        } else { return true; }
      },
      (line) => line !== END,
      (line) => line !== ''
    ];

    if (prefix.length !== 11) {
      this.setError(errorMessages[0]);
    } else {
      const errorIndex = _findIndex(converters, (condition, i) => condition(prefix[i]));
      if (errorIndex !== -1) { this.setError(errorMessages[errorIndex]); }
    }
  }

  private setError(message: string) {
    this.isValid = false;
    this.error = message;
  }

  public toString() {
    return _join([
      zenGin,
      `ver ${this.ver}`,
      genericArchive,
      ASCII,
      `saveGame ${this.saveGame}`,
      `date ${this.date.format(gothicDateFormat)}`,
      `user ${this.user}`,
      END,
      `objects ${this.objects}`,
      END,
      '\n',
    ], '\n');
  }
}
