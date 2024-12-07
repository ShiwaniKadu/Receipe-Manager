import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReceipeModel } from '../model/receipe.model';

@Injectable({
  providedIn: 'root',
})
export class ReceipeService {
  private baseUrl = 'http://localhost:3000/receipe';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<ReceipeModel[]> {
    return this.http.get<ReceipeModel[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  createRecipe(recipeData: Partial<ReceipeModel>): Observable<ReceipeModel> {
    return this.http.post<ReceipeModel>(this.baseUrl, recipeData).pipe(catchError(this.handleError));
  }

  updateRecipe(id: string, recipeData: Partial<ReceipeModel>): Observable<ReceipeModel> {
    return this.http.put<ReceipeModel>(`${this.baseUrl}/${id}`, recipeData).pipe(catchError(this.handleError));
  }

  deleteRecipe(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`API Error: ${error.message}`);
    return throwError(() => new Error(error.error.message || 'An error occurred.'));
  }
}
