import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceipeModel } from '../model/receipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000/api/recipes';  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecipes() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/recipes`, { headers });
  }

  createRecipe(recipeData: { name: string, ingredients: string }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/recipes`, recipeData, { headers });
  }
}