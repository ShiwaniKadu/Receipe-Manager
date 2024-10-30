import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReceipeFormComponent } from '../receipe-form/receipe-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReceipeFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  receipeArray: any[] = [];
  receipeForm: FormGroup = new FormGroup({ 
    title: new FormControl(''),
    ingredients: new FormControl(''),
    instructions: new FormControl(''),
    prepTime: new FormControl(''),
    cookTime: new FormControl(''),
    servings: new FormControl(''),
    difficulty: new FormControl('')
  });

  constructor(private http: HttpClient) {
    this.getAllReceipe();
  }

  getAllReceipe() {
    this.http.get('https://jsonplaceholder.typicode.com/receipe').subscribe(
      (res: any) => {
        this.receipeArray = res;
      },
      (error) => {
        console.error("Error fetching recipes:", error);
      }
    );
  }

  onEdit(receipeId: number) {
    this.http.get(`https://jsonplaceholder.typicode.com/receipe/${receipeId}`).subscribe(
      (res: any) => {
        this.receipeForm.setValue({
          title: res.title,
          ingredients: res.ingredients,
          instructions: res.instructions,
          prepTime: res.prepTime,
          cookTime: res.cookTime,
          servings: res.servings,
          difficulty: res.difficulty
        });
      },
      (error) => {
        console.error("Error fetching recipe details:", error);
      }
    );
  }
}