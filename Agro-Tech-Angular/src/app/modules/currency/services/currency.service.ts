import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Currency } from "../models/currency";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, currency: Currency): Observable<Currency> {
    if (id) {
      return this.update(id, currency);
    }
    return this.create(currency);
  }

  create(currency: Currency): Observable<Currency> {
    let url = this.baseUrl()+"/currency";
    return this.http.post<Currency>(url, currency);
  }

  update(id: string, currency: Currency): Observable<Currency> {
    let url = `${this.baseUrl()}/currency/${id}`;
    return this.http.put<Currency>(url, currency);
  }

  findById(id: string): Observable<Currency> {
    let url = `${this.baseUrl()}/currency/${id}`;
    return this.http.get<Currency>(url);
  }

  findAll(): Observable<Array<Currency>> {
    let url = this.baseUrl()+'/currency';
    return this.http.get<Array<Currency>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Currency>> {
    let url = this.baseUrl() + "/currency/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Currency>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/currency/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/currency/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/currency/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Currency>> {
    let url = this.baseUrl() + "/currency/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Currency>>(url, { params });
  }
}
