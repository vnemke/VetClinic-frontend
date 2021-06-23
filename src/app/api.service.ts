import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
    
    constructor(private http: HttpClient) {}

    get<T>(url: string): Observable<T> {
		return this.http.get<T>(url)
	}

	post<T>(url: string, body: Object): Observable<T> {
		return this.http.post<T>(url, body)
	}

	update<T>(url: string, body: T): Observable<T> {
		return this.http.put<T>(url, body)
	}

	delete<T>(url: string): Observable<T> {
		return this.http.delete<T>(url)
	}
}