import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, shareReplay, tap, throwError} from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static readonly API_ENDPOINT = 'https://gorest.co.in/public/v2/users';

  private _users$!: Observable<User[]>;
  private _lastError = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {}

  get lastError$(): Observable<string | null> {
    return this._lastError.asObservable();
  }

  getUsers$(): Observable<User[]> {
    return this._users$;
  }

  fetchUsers(): void {
    this._users$ = this.http.get<User[]>(UserService.API_ENDPOINT).pipe(
      tap(() => {
        this._lastError.next(null);
      }),
      catchError(_ => {
        let errorMessage = 'Unable to fetch users';
        this._lastError.next(errorMessage);
        return throwError(errorMessage);
      }),
      shareReplay(1)
    );
  }
}
