import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SongModel} from '../models/SongModel';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<SongModel[]> {
    return this.http.get<SongModel[]>('http://localhost:8080/api/songs/');
  }
}
