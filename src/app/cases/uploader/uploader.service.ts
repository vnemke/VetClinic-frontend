import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
	
  	constructor(private http: HttpClient) {}
	 
	upload<T>(url: string, file: any) {
		var fd = new FormData();
		fd.append('files', file)

		return this.http.post<T>(url, fd, {
			reportProgress: true,
			observe: 'events'
		})
	}
}
