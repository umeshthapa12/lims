import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TestRequestDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getTestRequestDetails(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/${payload.id}?form_available=analyst&analyst_user=${payload.user}&status=`);
  }


  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  getFormParameters(payload):Observable<any> {
    return this.http.post(`${this.url}/api/get-formula-fields/`, payload)
  }

  calculateResult(payload):Observable<any> {
    return this.http.post(`${this.url}/api/formula-calculate/`, payload)
  }

  setResult(payload):Observable<any> {
    return this.http.post(`${this.url}/api/formula-result-save/`, payload)
  }

  sendForVarification(payload, id) {
    return this.http.patch(`${this.url}/api/sample-form-has-parameter-assign-users/${id}/`, payload);
  }

  getRawDataSheetDetails(id): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/${id}/`)
  }

  getRawData(id):Observable<any> {
    return this.http.get(`${this.url}/api/detail-raw-data-sheet/${id}/`)
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

  setMicorParameters(payload):Observable<any> {
    return this.http.post(`${this.url}/api/microparameter/`,payload)
  }

  updateMicorParameters(payload):Observable<any> {
    return this.http.put(`${this.url}/api/microparameter/${payload.id}/`,payload)
  }

  saveObservationTable(payload): Observable<any> {
    return this.http.post(`${this.url}/api/micro-observation-table/`, payload)
  }

  updateObservationTable(payload): Observable<any> {
    return this.http.put(`${this.url}/api/micro-observation-table/${payload.id}`, payload)
  }

  getMicroParameterDetails(payload):Observable<any> {
    return this.http.get(`${this.url}/api/microparameter/${payload.id}/`)
  }
}
