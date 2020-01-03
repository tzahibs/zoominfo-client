import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http :HttpClient) { 
  }

  getData(url){
    return this.http.get<any>(url)
  }

}
