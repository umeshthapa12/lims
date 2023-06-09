import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AssignedSampleService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllSampleRequsets(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&supervisor_user=${payload.user}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`)
  }

  getAllRequestSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/supervisors-have-parameter/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&supervisor_user=${payload.user}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`)
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
  }

  assignSampleToAnalyst(payload) {
    return this.http.post(`${this.url}/api/sample-form-has-parameter-assign-users/`, payload);
  }

  getCommodities():Observable<any> {
    return this.http.get(`${this.url}/api/commodity/`)
  }

}
