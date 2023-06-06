import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SampleReportService {
  url = environment.apiURL;

  constructor(private http: HttpClient){}

  getAssignedSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/report/detail-sample-form-has-parameter-has-assigned-analyst/${payload.id}/`)
  }

  sendReportForVerification(payload):Observable<any> {
    return this.http.patch(`${this.url}/api/sample-form-has-verifier/${payload.id}/`, payload)
  }

  isSentForVrification(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-verifier/?sample_form_id=${payload.id}`)
  }
}
