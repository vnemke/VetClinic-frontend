import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadOneService {

  // constructor(private http: HttpClient, private auth:AuthService) {}

  // private baseUrl=environment.apiUrl;
  // public url = '/upload/';

  // public URL=this.baseUrl+this.url;
  

  // public upload(file: File,path): Observable<HttpEvent<any>> {

  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', this.URL, formData, {
  //       headers:new HttpHeaders({ 
  //           'ContentType': 'application/x-www-form-urlencoded',
  //           'Authorization': `Bearer ${this.auth.getStorageToken()}`
  //       })
  //   });
  //   return this.http.request(req);
  // }
}
