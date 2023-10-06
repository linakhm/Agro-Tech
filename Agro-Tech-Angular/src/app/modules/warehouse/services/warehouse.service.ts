import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { Warehouse } from "../models/warehouse.model";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, warehouse: Warehouse): Observable<Warehouse> {
    if (id) {
      return this.update(id, warehouse);
    }
    return this.create(warehouse);
  }

  create(warehouse: Warehouse): Observable<Warehouse> {
    let url = this.baseUrl()+"/warehouse";
    return this.http.post<Warehouse>(url, warehouse);
  }

  update(id: string, warehouse: Warehouse): Observable<Warehouse> {
    let url = `${this.baseUrl()}/warehouse/${id}`;
    return this.http.put<Warehouse>(url, warehouse);
  }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/warehouse/import";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Warehouse> {
    let url = `${this.baseUrl()}/warehouse/${id}`;
    return this.http.get<Warehouse>(url);
  }

  findAll(): Observable<Array<Warehouse>> {
    let url = this.baseUrl()+'/warehouse';
    return this.http.get<Array<Warehouse>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Warehouse>> {
    let url = this.baseUrl() + "/warehouse/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Warehouse>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/warehouse/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/warehouse/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/warehouse/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Warehouse>> {
    let url = this.baseUrl() + "/warehouse/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Warehouse>>(url, { params });
  }
}
