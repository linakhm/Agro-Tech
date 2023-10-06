import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

import { Company } from "../models/comany";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: Company): Observable<Company> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: Company): Observable<Company> {
    let url = this.baseUrl()+"/campany";
    return this.http.post<Company>(url, comp);
  }

  update(id: string, comp: Company): Observable<Company> {
    let url = `${this.baseUrl()}/campany/${id}`;
    return this.http.put<Company>(url, comp);
  }

  findById(id: string): Observable<Company> {
    let url = `${this.baseUrl()}/campany/${id}`;
    return this.http.get<Company>(url);
  }

  findAll(): Observable<Array<Company>> {
    let url = this.baseUrl()+'/campany';
    return this.http.get<Array<Company>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Company>> {
    let url = this.baseUrl() + "/campany/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Company>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/campany/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/campany/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/campany/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Company>> {
    let url = this.baseUrl() + "/campany/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Company>>(url, { params });
  }
}
