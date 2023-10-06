import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BeginningInventory } from "../models/beginninginventory.model";
import { Page } from "app/shared/models";
@Injectable({
  providedIn: 'root'
})
export class BeginninginventoryService {

    constructor(private http: HttpClient) { }

    baseUrl() {
        return `${"http://localhost:8089"}`;
    }

    save(id: string | null, beginninginventory: BeginningInventory): Observable<BeginningInventory> {
        if (id) {
            return this.update(id, beginninginventory);
        }
        return this.create(beginninginventory);
    }

   create(beginninginventory: BeginningInventory): Observable<BeginningInventory> {
        let url = this.baseUrl()+"/InventaireInitial";

       // let url = this.baseUrl() + '/InventaireInitial';
        return this.http.post<BeginningInventory>(url, beginninginventory);
    }
    /*create(beginninginventory: BeginningInventory): Observable<BeginningInventory> {
        let url = `${this.baseUrl()}/InventaireInitial`;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Add this line
        return this.http.post<BeginningInventory>(url, beginninginventory, { headers });
    }*/
    public searchInventory(price?: number, name?: string): Observable<BeginningInventory[]> {
        console.log('price:', price);
        console.log('name:', name);
        let url = this.baseUrl() + '/InventaireInitial/searchInventory';
        if (name && price) {
            url += `?name=${name}&price=${price}`;
        } else if (name) {
            url += `?name=${name}`;
        } else if (price) {
            url += `?price=${price}`;
        }
        return this.http.get<BeginningInventory[]>(url);
    }



    update(id: string, beginninginventory: BeginningInventory): Observable<BeginningInventory> {
        let url = `${this.baseUrl()}/InventaireInitial/${id}`;
        return this.http.put<BeginningInventory>(url, beginninginventory);
    }

    importCSV(formData: FormData): Observable<void> {
        let url = this.baseUrl() + "/InventaireInitial/importCSV";

        let headers = new HttpHeaders();
        headers.append("Content-Type", "multipart/form-data");
        const options = { headers };

        return this.http.post<void>(url, formData, options);
    }

    findById(id: string): Observable<BeginningInventory> {
        let url = `${this.baseUrl()}/InventaireInitial/${id}`;
        return this.http.get<BeginningInventory>(url);
    }

    findAll(): Observable<Array<BeginningInventory>> {
        let url = this.baseUrl() + '/InventaireInitial';
        return this.http.get<Array<BeginningInventory>>(url);
    }

    findPage(
        pageSize: number,
        pageNumber: number,
        filter: string
    ): Observable<Page<BeginningInventory>> {
        let url = this.baseUrl() + "/InventaireInitial/page";
        let params = new HttpParams();
        params = params.append("pageSize", pageSize.toString());
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("filter", filter);
        return this.http.get<Page<BeginningInventory>>(url, { params });
    }


    delete(id: string): Observable<boolean> {
        let url = `${this.baseUrl()}/InventaireInitial/${id}`;
        return this.http.delete<boolean>(url);
    }
  
    downloadCSVTemplate(): Observable<any> {
        let url = `${this.baseUrl()}/InventaireInitial/CSV`;
        return this.http.get(url, { responseType: "blob" });
    }
    
    downloadPDFTemplate(): Observable<ArrayBuffer> {
        const headers = new HttpHeaders().set('Accept', 'application/pdf');
        return this.http.get(`${this.baseUrl()}/InventaireInitial/pdf`, { headers, responseType: 'arraybuffer' });
    }
    /*
    downloadPDFTemplate(): Observable<HttpResponse<Blob>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
        const options = { headers: headers, responseType: 'blob' as 'json' };

        return this.http.get(`${this.baseUrl()}/InventaireInitial/pdf`, { ...options, observe: 'response', responseType: 'blob' });
    }*/


    archive(id: string): Observable<void> {
        let url = `${this.baseUrl()}/InventaireInitial/archiver/${id}`;
        return this.http.get<void>(url);
    }

    disArchive(id: string): Observable<void> {
        let url = `${this.baseUrl()}/InventaireInitial/desarchiver/${id}`;
        return this.http.get<void>(url);
    }

    findArchivedPage(
        pageNumber: number,
        pageSize: number,
        filter: string
    ): Observable<Page<BeginningInventory>> {
        let url = `${this.baseUrl()}/InventaireInitial/archived/page`;
        let params = new HttpParams();
        params = params.append("pageSize", pageSize);
        params = params.append("pageNumber", pageNumber);
        params = params.append("filter", filter);
        return this.http.get<Page<BeginningInventory>>(url, { params });
    }
    findByName(name: string): Observable<BeginningInventory> {
        let url = `${this.baseUrl()}/InventaireInitial/getbyname/${name}`;
        return this.http.get<BeginningInventory>(url);
    }
    findByCode(code: string): Observable<BeginningInventory> {
        let url = `${this.baseUrl()}/InventaireInitial/by-code/${code}`;
        return this.http.get<BeginningInventory>(url);
    }
    findByProductType(type: string): Observable<string[]> {
        let url = `${this.baseUrl()}/InventaireInitial/getbyProduitName/${type}`;
        return this.http.get<string[]>(url);
    }



}
