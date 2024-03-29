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

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }

  objectToFormData(obj: any): FormData {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

  createUser(payload: any,additionalDocuments, doc?, renewDoc? ):Observable<any> {
    let images = additionalDocuments;
    delete payload['additionalDocs'];
    const formData:FormData = this.objectToFormData(payload);

    additionalDocuments.forEach((image,index) => {
      formData.append(`images[file]`, image.file);
      formData.append(`images[name]`, image.document_name);
    })


    if(doc) {
      formData.append('registration_document', doc, doc?.name);
    }

    if(renewDoc) {
      formData.append('renew_document', renewDoc, renewDoc?.name);
    }


    return this.http.post(`${this.url}/api/account/users/`, formData);
  }

  getGetDepartmentTypes() :Observable<any> {
    return this.http.get(`${this.url}/api/account/department-types/`)
}

  updateUser(payload,additionalDocuments, doc?,renewDoc?):Observable<any> {
    delete payload['additionalDocs'];
    const formData:FormData = this.objectToFormData(payload);

    additionalDocuments.forEach((image,index) => {
      formData.append(`images[file]`, image.file);
      formData.append(`images[name]`, image.document_name);
    })

    if(doc) {
    formData.append('registration_document', doc, doc?.name);
    }
    if(renewDoc) {
    formData.append('renew_document', renewDoc, renewDoc?.name);
    }
    return this.http.put(`${this.url}/api/account/users/${payload.id}/`, formData)
  }

  getUserRole():Observable<any> {
    return this.http.get(`${this.url}/api/account/groups`);
  }

  getRole():Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`)
  }
}
