import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activity} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) { }

  getActivity(id: string): Observable<Activity> {
    return this.http.get<Activity>(`${API}/id/${id}`);
  }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(API);
  }
}

const API = 'http://orangevalleycaa.org/api/videos';
