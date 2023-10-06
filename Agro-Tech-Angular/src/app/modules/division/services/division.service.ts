import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Division } from "../models/division";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class DivisionService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, division: Division): Observable<Division> {
    if (id) {
      return this.update(id, division);
    }
    return this.create(division);
  }

  create(division: Division): Observable<Division> {
    let url = this.baseUrl()+'/division';
    return this.http.post<Division>(url, division);
  }

  update(id: string, division: Division): Observable<Division> {
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.put<Division>(url, division);
  }

  findById(id: string): Observable<Division> {
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.get<Division>(url);
  }

  findAll(): Observable<Array<Division>> {
    let url = this.baseUrl()+'/division';
    return this.http.get<Array<Division>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Division>> {
    let url = this.baseUrl() + "/division/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Division>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/division/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/division/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Division>> {
    let url = this.baseUrl() + "/division/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Division>>(url, { params });
  }
}
