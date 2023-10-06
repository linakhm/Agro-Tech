import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Growout } from "../models/growout";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class GrowoutService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, growout: Growout): Observable<Growout> {
    if (id) {
      return this.update(id, growout);
    }
    return this.create(growout);
  }

  create(growout: Growout): Observable<Growout> {
    let url = this.baseUrl()+'/growout';
    return this.http.post<Growout>(url, growout);
  }

  update(id: string, growout: Growout): Observable<Growout> {
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.put<Growout>(url, growout);
  }

  findById(id: string): Observable<Growout> {
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.get<Growout>(url);
  }

  findAll(): Observable<Array<Growout>> {
    let url = this.baseUrl()+'/growout';
    return this.http.get<Array<Growout>>(url);
  }

  findAllNoDeleted(): Observable<Array<Growout>> {
    let url = `${this.baseUrl()}/growout/list`;
    return this.http.get<Array<Growout>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Growout>> {
    let url = this.baseUrl() + "/growout/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Growout>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/growout/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/growout/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Growout>> {
    let url = this.baseUrl() + "/growout/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Growout>>(url, { params });
  }
}
