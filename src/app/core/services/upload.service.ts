// import { Injectable } from '@angular/core';

// import { AuthService } from '../../auth/services/auth.service';
// import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { environment } from '@env/environment';
// // import { UploadedFile } from '../model/uploaded-file';
// import { Subject } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class UploadService {

//   constructor(private http: HttpClient, private auth:AuthService) { }

//   public url = '/upload';
//   public URL = environment.apiUrl+'/upload';
  

//   public upload(files: UploadedFile[],path): Object {
//     // this will be the our resulting map
//     const status = {};

//     files.forEach(file => {
//       // create a new multipart-form for every file
//       const formData: FormData = new FormData();
//       formData.append('file', file.file);

//       // create a http-post request and pass the form
//       // tell it to report the upload progress
//       const req = new HttpRequest('POST', this.URL, formData, {
//         reportProgress: true,
//         headers:new HttpHeaders({ 
//             'ContentType': 'application/x-www-form-urlencoded',
//             'Authorization': `Bearer ${this.auth.getStorageToken()}`
//     })
        
//       });

//       // create a new progress-subject for every file
//       const progress = new Subject<number>();

//       // send the http-request and subscribe for progress-updates
//       let subscription=this.http.request(req).subscribe(event => {
//         if (event.type === HttpEventType.UploadProgress) {
//           // calculate the progress percentage
//           const percentDone = Math.round(100 * event.loaded / event.total);
//           status[file.tempId].uploadStarted=true;
//           // pass the percentage into the progress-stream
//           progress.next(percentDone);
//         } else if (event instanceof HttpResponse) {

//           // Close the progress-stream if we get an answer form the API
//           // The upload is complete
//           progress.complete();
//           status[file.tempId].uploadCompleted=true;
//           status[file.tempId].response=event.body;
//         }
//       });

//       // Save every progress-observable in a map of all observables
//       status[file.tempId] = {
//         progress: progress.asObservable(),
//         cancelSubscription: function(){subscription.unsubscribe()},
//         uploadCompleted:false,
//         uploadStarted: false,
//         response:{}
//       };
//     });

//     // return the map of progress.observables
//     return status;
//   }

// }
