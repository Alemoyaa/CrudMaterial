import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Persona } from '../modelos/persona';
import { tap, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  _url: string = 'http://localhost:9000/api/v1/persona/';

  private _refresh = new Subject<void>();



  constructor(private http: HttpClient) { }


  getAll(): Observable<Persona[]> {


    return this.http.get<Persona[]>(this._url).pipe(catchError(this.manejarError));


  }


  post(persona: Persona): Observable<Persona> {

    return this.http.post<Persona>(this._url, persona).pipe(
      tap(() => { this._refresh.next(); }),
      catchError(this.manejarError));


  }

  put(id: number, persona: Persona): Observable<Persona> {

    return this.http.put<Persona>(this._url + id, persona).pipe(
      tap(() => { this._refresh.next(); }),
      catchError(this.manejarError));



  }

  delete(id: number): Observable<any> {

    return this.http.delete(this._url + id).pipe(
      tap(() => { this._refresh.next(); }),
      catchError( this.manejarError) );


  }

  get refresh() {
    return this._refresh;
  }


  manejarError(error: HttpErrorResponse){

    console.warn(error);
    return throwError('persona service');
  }
}
