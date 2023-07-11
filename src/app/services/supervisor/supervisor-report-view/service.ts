

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupervisorReportViewService {
  url = environment.apiURL;

  constructor(private http: HttpClient){}

  getSampleReportDetails(payload):Observable<any> {

    return this.http.get(`${this.url}/api/report/detail-sample-form-has-assigned-analyst-final-report/${payload.id}/`, payload)
  }

  downloadReport(payload) :Observable<any> {
    let url = `${this.url}/api/report/get-single-report/${payload.report_name}/${payload.report_type}/${payload.lang}/${payload.id}/${payload.role}`;
    window.location.href = url;
    return this.http.get(url);
  }

  downloadReportNepali(payload) {
    let base = 'https://pdfmachine.kantipurinfotech.com.np/public'
    let url = `${base}/api/show-pdf-report/${payload.id}/${payload.role}/`;
    // window.location.href = url;
    window.open(url, "_blank");
    return this.http.get(url);
  }

  getSupervisorRawData(id): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-raw-data-sheet-test-type/${id}/`)
    // /api/sample-form-raw-data-sheet-test-type/345/
  }

  downloadRawData(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    window.location.href = url;
    return this.http.get(`${url}`)
  }

  printRawData(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }
}
