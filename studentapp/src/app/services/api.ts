import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private http = inject(HttpClient);

  // private baseUrl = 'http://172.17.12.50:8082/reborn/api';
getCountries() {
  return this.http.get<any[]>(
    'http://172.17.12.50:8082/reborn/api/getCountries'
  );
}
 getStates(countryId: number) {

  return this.http.get(
    `http://172.17.12.50:8082/reborn/api/states/${countryId}`
  );

}

getCities(stateId: number) {

  return this.http.get<any[]>(
    `http://172.17.12.50:8082/reborn/api/cities/${stateId}`
  );

}


getCourses(){
  return this.http.get<any[]>(
    'http://172.17.12.50:8082/reborn/api/lk-codes/CRS'
  );

}


getBranches(courseCode: string) {

  return this.http.get<any[]>(
    `http://172.17.12.50:8082/reborn/api/lk-codes/${courseCode}`
  );

}






}