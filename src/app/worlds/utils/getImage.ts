import { Observable, Observer } from 'rxjs';

export const getImage = (url: string): Observable<HTMLImageElement> => (
  Observable.create((observer: Observer<HTMLImageElement>) => {
    const img: HTMLImageElement = new Image();
    function loadListener() {
      observer.next(this);
      observer.complete();
      img.removeEventListener('load', loadListener);
    }

    img.src = url;
    img.addEventListener('load', loadListener);
  })
);

