import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produit } from "../models/produit.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class ProduitsService {
  constructor(private http: HttpClient) {}

    baseUrl() {
        return `${"http://localhost:8080/products"}`;
    }

  save(id: string | null, produit: Produit): Observable<Produit> {
    if (id) {
      return this.update(id, produit);
    }
    return this.create(produit);
  }

    create(produit: Produit): Observable<Produit> {
      console.log("****add product called this.produit is  ",produit);
      let url = this.baseUrl() +'/addProduct';
    return this.http.post<Produit>(url, produit);
  }

  update(id: string, produit: Produit): Observable<Produit> {
    let url = `${this.baseUrl()}/updateProduct/${id}`;
    return this.http.put<Produit>(url, produit);
  }

    importCSV(formData: FormData): Observable<void> {
        let url = this.baseUrl() + "/importProdCSV";

        let headers = new HttpHeaders();
        headers.append("Content-Type", "multipart/form-data");
        const options = { headers };

        return this.http.post<void>(url, formData, options);
    }

  findById(id: string): Observable<Produit> {
      let url = `${this.baseUrl()}/getProductById/${id}`;
    return this.http.get<Produit>(url);
  }
    findAll(): Observable<Array<Produit>> {
        let url = this.baseUrl() + '/productslist';
        return this.http.get<Array<Produit>>(url);
    }


  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Produit>> {
      let url = this.baseUrl() + "/productslist";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
  //  params = params.append("filter", filter);
    return this.http.get<Page<Produit>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
      let url = `${this.baseUrl()}/deleteProduct/${id}`;
    return this.http.delete<boolean>(url);
  }

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
    


  /*  getArchivedProducts(): Observable<Produit[]> {
        console.log("called  getarchived");

        return this.http.get<Produit[]>(this.baseUrl + "/getArchived");
    }
    */
    findArchivedProducts(
        pageNumber: number,
        pageSize: number, filter: string
        
    ): Observable<Page<Produit>> {
        let url = this.baseUrl() + "/getArchived";
        let params = new HttpParams();
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("pageSize", pageSize.toString());
        console.log("*********find archived");
        //  params = params.append("filter", filter);
        return this.http.get<Page<Produit>>(url, { params });
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
    }*/
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
}
