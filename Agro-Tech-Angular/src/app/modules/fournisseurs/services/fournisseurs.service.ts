import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { Fournisseur } from "../models/fournisseur.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class FournisseursService {
    private vendorsSubject = new BehaviorSubject<Array<Fournisseur>>([]);

  constructor(private http: HttpClient) {}

  baseUrl() {
      return `${"http://localhost:8089/vendors"}`;
  }

  save(id: string | null, fournisseur: Fournisseur): Observable<Fournisseur> {
    if (id) { //if id exist
      return this.update(id, fournisseur);
    }
    return this.create(fournisseur);
  }

  create(fournisseur: Fournisseur): Observable<Fournisseur> {
    let url = this.baseUrl()+'/addVendor';
    return this.http.post<Fournisseur>(url, fournisseur);
  }

  update(id: string, fournisseur: Fournisseur): Observable<Fournisseur> {
    let url = `${this.baseUrl()}/updateVendor/${id}`;
    return this.http.put<Fournisseur>(url, fournisseur);
    }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/importCSV";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Fournisseur> {
      let url = `${this.baseUrl()}/getVendorById/${id}`;
    return this.http.get<Fournisseur>(url);
  }

  findAll(): Observable<Array<Fournisseur>> {
    let url = this.baseUrl()+'/vendorslist';
    return this.http.get<Array<Fournisseur>>(url);
  }


    public searchVendors(name?: string, namecity?: any): Observable<Fournisseur[]> {
        console.log('name:', name);
        console.log('namecity:', namecity);
        let url = this.baseUrl() + '/searchVendors';
        if (name && namecity) {
            url += `?name=${name}&namecity=${namecity}`;
        } else if (name) {
            url += `?name=${name}`;
        } else if (namecity) {
            url += `?namecity=${namecity}`;
        }
        return this.http.get<Fournisseur[]>(url);
    }

    findPage(
    pageSize: number,
    pageNumber: number,
    filter: string
  ): Observable<Page<Fournisseur>> {
    let url = this.baseUrl() + "/vendorslist";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
      params = params.append("pageSize", pageSize);
    //  params = params.append("sortField", sortField);
     // params = params.append("sortDir", sortDir);

   params = params.append("filter", filter);
   return this.http.get<Page<Fournisseur>>(url, { params });

  }

    delete(id: string){
    let url = `${this.baseUrl()}/${id}`;
        return this.http.delete(url);
  }



  downloadCSVTemplate(): Observable<any> {
    let url = `${this.baseUrl()}/Vendors-Csv`;
    return this.http.get(url, { responseType: "blob" });
    }



  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
      pageSize: number,
      pageNumber: number,
      filter: string
  ): Observable<Page<Fournisseur>> {
    let url = this.baseUrl() + "/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Fournisseur>>(url, { params });

    }
    downloadPDFTemplate(): Observable<ArrayBuffer> {
        const headers = new HttpHeaders().set('Accept', 'application/pdf');
        return this.http.get(`${this.baseUrl()}/pdf`, { headers, responseType: 'arraybuffer' });
    }
}
