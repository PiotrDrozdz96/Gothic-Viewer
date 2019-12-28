import { Observable, Observer } from 'rxjs';

export const getImage = (url: string): Observable<HTMLImageElement> => (
  Observable.create((observer: Observer<HTMLImageElement>) => {
    const img: HTMLImageElement = new Image();
    img.src = url;
    img.addEventListener('load', function() {
      observer.next(this);
      observer.complete();
    });
  })
);

