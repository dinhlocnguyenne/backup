import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(message: String):Observable<any>{
    return this.http.post("http://localhost:8000/chatbot/", {message})
  }
}
