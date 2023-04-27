import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/?page=2&records=4`);
  }

  createUser(payload: any):Observable<any> {
    return this.http.post(`${this.url}/api/account/users/`, payload)
  }
}
