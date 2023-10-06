import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { Farm } from "../models/farm";

@Injectable({
  providedIn: "root",
})
export class FarmsService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, farm: Farm): Observable<Farm> {
    if (id) {
      return this.update(id, farm);
    }
    return this.create(farm);
  }

  create(farm: Farm): Observable<Farm> {
    let url = this.baseUrl()+'/ferme';
    return this.http.post<Farm>(url, farm);
  }

  update(id: string, farm: Farm): Observable<Farm> {
    let url = `${this.baseUrl()}/ferme/${id}`;
    return this.http.put<Farm>(url, farm);
  }

  findById(id: string): Observable<Farm> {
    let url = `${this.baseUrl()}/ferme/${id}`;
    return this.http.get<Farm>(url);
  }

  findAll(): Observable<Array<Farm>> {
    let url = this.baseUrl();
    return this.http.get<Array<Farm>>(url);
  }

  //list of frame no deleted
  findAllNoDeleted(): Observable<Array<Farm>> {
    let url = `${this.baseUrl()}/ferme/list`;
    return this.http.get<Array<Farm>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Farm>> {
    let url = this.baseUrl() + "/ferme/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Farm>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/ferme/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/ferme/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/ferme/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Farm>> {
    let url = this.baseUrl() + "/ferme/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Farm>>(url, { params });
  }
}
