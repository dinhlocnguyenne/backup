import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(
    private http:HttpClient
  ) { }

  transform(text: String):Observable<any>{
    return this.http.post("http://localhost:8000/tts/", {text}, {responseType: "blob"})
  }
}
