import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RecipeService } from '../../core/services/receipe.service';
import { User } from '../../core/model/common.model';
import { ReceipeModel} from '../../core/model/receipe.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  authService = inject(AuthService);
  recipeService = inject(RecipeService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  user: User | null = null;
  recipeForm: FormGroup;
  recipeObj: ReceipeModel | null = null;
  recipeList: ReceipeModel[] = [];

  constructor() {
    this.recipeForm = this.createForm();
    const storedData = localStorage.getItem('RecipeData');
    this.recipeList = storedData ? JSON.parse(storedData) : [];
  }

  ngOnInit(): void {
    this.authService.me().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: () => this.router.navigate(['login']),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      prepTime: [0, Validators.required],
      cookTime: [0, Validators.required],
      servings: [0, Validators.required],
      difficulty: ['Easy', Validators.required],
    });
  }

  onSave(): void {
    this.recipeList.unshift(this.recipeForm.value);
    localStorage.setItem('RecipeData', JSON.stringify(this.recipeList));
    this.resetForm();
  }

  onEdit(recipe: ReceipeModel): void {
    this.recipeObj = { ...recipe };
    this.recipeForm.patchValue({ ...this.recipeObj });
  }

  onUpdate(): void {
    if (this.recipeObj) {
      const index = this.recipeList.findIndex(
        (r) => r.title === this.recipeObj?.title
      );
      if (index !== -1) {
        this.recipeList[index] = this.recipeForm.value;
        localStorage.setItem('RecipeData', JSON.stringify(this.recipeList));
      }
      this.resetForm();
    }
  }

  onDelete(index: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeList.splice(index, 1);
      localStorage.setItem('RecipeData', JSON.stringify(this.recipeList));
    }
  }

  resetForm(): void {
    this.recipeObj = null;
    this.recipeForm.reset({
      title: '',
      ingredients: '',
      instructions: '',
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      difficulty: 'Easy',
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
