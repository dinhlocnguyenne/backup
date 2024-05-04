import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SttService {

  constructor(
    private http: HttpClient
  ) { }

  transcribeFile(file: File): Observable<any>{
    var form = new FormData()
    form.append("file", file)

    return this.http.post("http://localhost:8000/stt/file", form)
  }

  sendAudio(blob: Blob):Observable<any>{
    var formData = new FormData()
    formData.append("file", blob, "audio.wav")
    return this.http.post("http://localhost:8000/stt/file", formData)
  }
}
