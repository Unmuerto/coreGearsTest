import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiTableResponse,
  ApiVariablesResponse,
  Variables,
} from './interfaces';

const BASE_API = 'http://35.185.41.46/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  fetchData(): Observable<ApiVariablesResponse> {
    return this._http.get<ApiVariablesResponse>(`${BASE_API}/variables/`);
  }

  fetchTable(): Observable<ApiTableResponse> {
    return this._http.get<ApiTableResponse>(`${BASE_API}/table/`);
  }

  updateData(data: Variables[]): Observable<any> {
    return this._http.post(`${BASE_API}/variables/`, data);
  }
}
