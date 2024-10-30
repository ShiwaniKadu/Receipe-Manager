import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-receipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './receipe-form.component.html',
  styleUrls: ['./receipe-form.component.css']
})
export class ReceipeFormComponent {
  receipeForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    prepTime: new FormControl('', Validators.required),
    cookTime: new FormControl('', Validators.required),
    servings: new FormControl('', Validators.required),
    difficulty: new FormControl('Medium')
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.receipeForm.valid) {
      const receipeData = this.receipeForm.value;
      this.http.post('https://jsonplaceholder.typicode.com/receipe', receipeData).subscribe(
        (res: any) => {
          alert("Recipe Created");
          this.receipeForm.reset();
        },
        (error) => {
          alert("Error creating recipe");
          console.error(error);
        }
      );
    } else {
      alert("Please fill out all required fields.");
    }
  }
}
