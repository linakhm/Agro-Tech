import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../shared/models';
import { Externaltransfer } from '../models/externaltransfer.model';

@Injectable({
  providedIn: 'root'
})
export class ExternaltransfersService {

    constructor(private http: HttpClient) { }

    baseUrl() {
        return `${"http://localhost:8080/externals"}`;
    }

    save(refNumber: string | null, externaltransfer: Externaltransfer): Observable<Externaltransfer> {
        if (refNumber) {
            return this.update(refNumber, externaltransfer);
        }
        return this.create(externaltransfer);
    }

    create(externaltransfer: Externaltransfer): Observable<Externaltransfer> {
        console.log("****add Externaltransfer called this.externaltransfer is  ", externaltransfer);
        let url = this.baseUrl() + '/addExternalTransfer';
        return this.http.post<Externaltransfer>(url, externaltransfer);
    }

    update(refNumber: string, externaltransfer: Externaltransfer): Observable<Externaltransfer> {
        let url = `${this.baseUrl()}/updateExternaltransfer/${refNumber}`;
        return this.http.put<Externaltransfer>(url, externaltransfer);
    }

    importCSV(formData: FormData): Observable<void> {
        let url = this.baseUrl() + "/importInventoryCSV";

        let headers = new HttpHeaders();
        headers.append("Content-Type", "multipart/form-data");
        const options = { headers };

        return this.http.post<void>(url, formData, options);
    }

    findById(refNumber: string): Observable<Externaltransfer> {
        let url = `${this.baseUrl()}/getExternalTransfer/${refNumber}`;
        return this.http.get<Externaltransfer>(url);
    }
    findAll(): Observable<Array<Externaltransfer>> {
        let url = this.baseUrl() + '/transferslist';
        return this.http.get<Array<Externaltransfer>>(url);
    }


    findPage(
        pageNumber: number,
        pageSize: number,
        filter: string
    ): Observable<Page<Externaltransfer>> {
        let url = this.baseUrl() + "/transferslist";
        let params = new HttpParams();
        params = params.append("pageNumber", pageNumber);
        params = params.append("pageSize", pageSize);
        //  params = params.append("filter", filter);
        return this.http.get<Page<Externaltransfer>>(url, { params });
    }

    delete(refNumber: string): Observable<boolean> {
        let url = `${this.baseUrl()}/deleteExternalTransfer/${refNumber}`;
        return this.http.delete<boolean>(url);
    }
    downloadCSVTemplate(): Observable<any> {
        let url = `${this.baseUrl()}/Externals-Csv`;
        return this.http.get(url, { responseType: "blob" });
    }

    /*
    downloadCSVTemplate(): Observable<any> {
        let url = `${this.baseUrl()}/Products-Csv`;
        return this.http.get(url, { responseType: "blob" });
    }

    archive(id: string): Observable<void> {
        let url = `${this.baseUrl()}/archiver/${id}`;
        return this.http.post<void>(url, {});
    }

    disArchive(id: string): Observable<void> {
        let url = `${this.baseUrl()}/desarchiver/${id}`;
        return this.http.post<void>(url, {});
    }
    */


    /*  getArchivedProducts(): Observable<Produit[]> {
          console.log("called  getarchived");
  
          return this.http.get<Produit[]>(this.baseUrl + "/getArchived");
      }
      */
    
    findArchivedExternals(
        pageNumber: number,
        pageSize: number, filter: string

    ): Observable<Page<Externaltransfer>> {
        let url = this.baseUrl() + "/getArchived";
        let params = new HttpParams();
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("pageSize", pageSize.toString());
        console.log("*********find archived");
        //  params = params.append("filter", filter);
        return this.http.get<Page<Externaltransfer>>(url, { params });
    }

    /* findArchivedPage(
         pageNumber: number,
         pageSize: number,
         filter: string
     ): Observable<Page<Produit>> {
      
 
         return this.http.get<Page<Produit>>(`${this.baseUrl}/getArchived`);
     }*/

    /* findArchivedPage(
         pageNumber: number,
         pageSize: number,
         filter: string
     ): Observable<Page<Produit>> {
         let url = this.baseUrl() + "/produit/archived/page";
         let params = new HttpParams();
         params = params.append("pageNumber", pageNumber);
         params = params.append("pageSize", pageSize);
         params = params.append("filter", filter);
         return this.http.get<Page<Produit>>(url, { params });
     }
    public searchProds(taxRate?: number, category?: any): Observable<Produit[]> {
        console.log('taxRate:', taxRate);
        console.log('category:', category);
        let url = this.baseUrl() + '/searchProducts';
        if (taxRate && category) {
            url += `?taxRate=${taxRate}&category=${category}`;
        } else if (taxRate) {
            url += `?taxRate=${taxRate}`;
        } else if (category) {
            url += `?category=${category}`;
        }
        return this.http.get<Produit[]>(url);
    }
    */
    public searchExternals(price?: number, locationCode?: any): Observable<Externaltransfer[]> {
        console.log('price:', price);
        console.log('locationCode:', locationCode);
        let url = this.baseUrl() + '/searchExternals';
        if (price && locationCode) {
            url += `?price=${price}&locationCode=${locationCode}`;
        } else if (price) {
            url += `?price=${price}`;
        } else if (locationCode) {
            url += `?locationCode=${locationCode}`;
        }
        return this.http.get<Externaltransfer[]>(url);
    }
}
