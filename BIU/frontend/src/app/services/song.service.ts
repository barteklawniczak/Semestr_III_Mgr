import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SongModel} from '../models/SongModel';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<SongModel[]> {
    return this.http.get<any>('http://localhost:8080/api/songs/').map(res => res.data);
  }

  getSongById(id: string): Observable<SongModel> {
    return this.http.get<any>('http://localhost:8080/api/songs/' + id).map(res => res.data);
  }

  addNewSong(song: SongModel): Observable<any> {
    return this.http.post<SongModel>('http://localhost:8080/api/songs/', song);
  }

  updateSong(song: SongModel): Observable<any> {
    return this.http.put<SongModel>('http://localhost:8080/api/songs/' + song._id, song);
  }

  getUserSongs(userId: string): Observable<SongModel[]> {
    return this.http.get<any>('http://localhost:8080/api/songs/user/' + userId).map(res => res.data);
  }
}
