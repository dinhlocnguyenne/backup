import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentLocal } from 'src/app/environments/environment';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

// const BASIC_URL = 'http://localhost:8080/';
const BASIC_URL = environmentLocal.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
     
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
  //Question
  addQuestion(questionDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/question/add-question', questionDto, {
      headers: this.createAuthorizationHeader(), 
    });
  }

  getAllQuestionsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/question/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllQuestionsByContentIndexId(contentIndexId: any): Observable<any> {
    return this.http.get(
      BASIC_URL + `api/admin/question/contentIndex/${contentIndexId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
  getQuestionById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/question/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteQuestion(id: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/question/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateQuestion(id: number, questionDto: any): Observable<any> {
    return this.http.put(
      BASIC_URL + `api/admin/update-question/${id}`,
      questionDto,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
    //ContentIndex
    getAllContentIndex(): Observable<any> {
      return this.http.get(BASIC_URL + 'content-index');
    }
    

    getAllContentIndexWithLevel(level: any): Observable<any> {
      return this.http.get(BASIC_URL + `api/admin/content-index/${level}`, {
        headers: this.createAuthorizationHeader(),
      });
    }
    
    
  }
