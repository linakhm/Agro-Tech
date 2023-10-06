import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

import { CostCenter } from "../model/cost-center";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class CostCenterService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, costcenter: CostCenter): Observable<CostCenter> {
    if (id) {
      return this.update(id, costcenter);
    }
    return this.create(costcenter);
  }

  create(costcenter: CostCenter): Observable<CostCenter> {
    let url = this.baseUrl()+"/costcenter";
    return this.http.post<CostCenter>(url, costcenter);
  }

  update(id: string, costcenter: CostCenter): Observable<CostCenter> {
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.put<CostCenter>(url, costcenter);
  }

  findById(id: string): Observable<CostCenter> {
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.get<CostCenter>(url);
  }

  findAll(): Observable<Array<CostCenter>> {
    let url = this.baseUrl()+"/costcenter";
    return this.http.get<Array<CostCenter>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<CostCenter>> {
    let url = this.baseUrl() + "/costcenter/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<CostCenter>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/costcenter/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/costcenter/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<CostCenter>> {
    let url = this.baseUrl() + "/costcenter/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<CostCenter>>(url, { params });
  }
}
