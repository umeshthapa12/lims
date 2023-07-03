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
    return this.http.post(`${this.url}/api/sample-form-has-verifier/`, payload)
  }


  sendReportForVerificationFrom(payload):Observable<any> {
    return this.http.patch(`${this.url}/api/sample-form-has-verifier/${payload.id}/`, payload)
  }

  rejectSample(payload) :Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-reject/`, payload)
  }

  isSentForVrification(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-verifier/?sample_form_id=${payload.id}`)
  }

  patchRemarks(payload, id):Observable<any> {
    return this.http.patch(`${this.url}/api/sample-form/${id}/`, payload)
  }

  getRawDataSheet(id): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-raw-data-sheet-test-type/${id}/`)
    // /api/sample-form-raw-data-sheet-test-type/345/
  }

  getSamplesDetails(payload):Observable<any> {
    return this.http.get(`${this.url}/api/supervisors-have-parameter/${payload.id}/`)
  }

  sentForVerificationWithRemarks(payload):Observable<any> {
    return this.http.patch(`${this.url}/api/supervisors-have-parameter/${payload.id}/`, payload)
  }

  sendForRecheck(payload):Observable<any> {
    return this.http.post(`${this.url}/api/parameter-has-result-recheck/`, payload)
  }
}
