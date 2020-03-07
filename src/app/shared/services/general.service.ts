import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) {}
  getLatestRates(base) {
  return this.http.get(`${environment.apiUrl}/latest?base=` + base);
  }
  getLatestRatesHistoryByBase(base, startDate, endDate) {
    return this.http.get(`${environment.apiUrl}/history?start_at=` + startDate + '&end_at=' + endDate + '&base=' + base);
  }
  getLatestRatesHistoryByBaseForCurrency(symbol, startDate, endDate) {
    return this.http.get(`${environment.apiUrl}/history?start_at=` + startDate + '&end_at=' + endDate + '&symbols=' + symbol);
  }
}

