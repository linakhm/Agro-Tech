import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Page } from 'app/shared/models';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  baseUrl() {
    return `${environment.apiUrl}`
  }

  save(id: string|null, category: Category): Observable<Category> {
    if(id){
      return this.update(id, category)
    }
    return this.create(category)
  }

  create(category: Category): Observable<Category> {
    let url = this.baseUrl()+'/category';
    return this.http.post<Category>(url, category);
  }

  update(id: string, category: Category): Observable<Category> {
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.put<Category>(url, category);
  }

  findById(id: string): Observable<Category> {
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.get<Category>(url);
  }

  findAll(): Observable<Array<Category>> {
    let url = this.baseUrl()+'/category';
    return this.http.get<Array<Category>>(url);
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.delete<boolean>(url);
  }


}
