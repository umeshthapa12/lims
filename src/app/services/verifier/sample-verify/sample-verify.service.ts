import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SampleVerifyService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getSmaples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/completed-sample-form-has-assigned-verifier/?search=${payload.search}&status=${payload.status}`)
    // return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users?search=${payload.serarch}&limit=${payload.size}&offset=${payload.page}&from=${payload.from}&to=${payload.to}`)
  }

  getStatusList(payload?):Observable<any> {
    return this.http.get(`${this.url}/api/report/status/sample-verify/`)
  }
}
