import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TimusServiceService {

  url: string = "https://crossorigin.me/http://acm.timus.ru/author.aspx?id=ID&locale=en";
  constructor(private http: HttpClient) { }

  solverRegistered(solver: number) {
    const requestURL = this.url.replace("ID", solver.toString());
    return this.http
      .get(requestURL, { responseType: 'text' }).map(res => { 
        if (!res.includes("Author not found")) {
          var el = document.createElement( 'html' );
          el.innerHTML = res;
          return el.getElementsByClassName('author_name')[0].textContent
        }
        return false;
      });
  }

}
