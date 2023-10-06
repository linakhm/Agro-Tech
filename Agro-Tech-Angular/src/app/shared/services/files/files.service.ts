import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  download(data: any, fileName: string) {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(
      new Blob([data]),
    );
    link.href = url;
    link.setAttribute(
      'download',
      fileName,
    );
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
}
