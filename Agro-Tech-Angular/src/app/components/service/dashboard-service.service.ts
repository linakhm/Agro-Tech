import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Country } from "../model/Country";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }),
};
const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class DashboardServiceService {
  baseURL = environment.urlBack;
  serviceDashboard = environment.serviceDashboard;

  constructor(private http: HttpClient) {}

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(
      this.baseURL + this.serviceDashboard + "/country",
      httpHeaders
    );
  }

  averageAreaPerGovAndCountryAndProduct(country, product): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseURL +
        this.serviceDashboard +
        "/averagePerGov/" +
        country +
        "/" +
        product,
      httpHeaders
    );
  }

  detailsPerCountryAndProduct(country, product): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseURL +
        this.serviceDashboard +
        "/details/" +
        country +
        "/" +
        product,
      httpHeaders
    );
  }

  detailsPerCountryAndProductAndVariety(
    country,
    product,
    variety
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseURL +
        this.serviceDashboard +
        "/detailsByVariety/" +
        country +
        "/" +
        product +
        "/" +
        variety,
      httpHeaders
    );
  }

  detailsPerCountryAndProductAndVarietyAndYear(
    country,
    product,
    variety,
    min,
    max
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseURL +
        this.serviceDashboard +
        "/detailsByVarietyByYear/" +
        country +
        "/" +
        product +
        "/" +
        variety +
        "/" +
        min +
        "/" +
        max,
      httpHeaders
    );
  }
}
