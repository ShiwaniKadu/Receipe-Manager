import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ReceipeService } from '../../core/services/receipe.service';
import { User } from '../../core/model/common.model';
import { ReceipeModel } from '../../core/model/receipe.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  user: User | null = null;
  receipeForm: FormGroup;
  receipeList: ReceipeModel[] = [];
  isEditMode = false;
  currentReceipeId: string | null = null;

  authService = inject(AuthService);
  receipeService = inject(ReceipeService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.receipeForm = this.createForm();
  }

  ngOnInit(): void {
    this.authService.getLoggedUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response?.data) {
          this.user = response.data;
        } else {
          this.user = null;
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Authentication failed', err);
        this.router.navigate(['/login']);
      },
    });

    this.getReceipes();
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
      servings: [1, Validators.required],
      difficulty: ['Medium', Validators.required],
    });
  }

  getReceipes(): void {
    this.receipeService.getRecipes().pipe(takeUntil(this.destroy$)).subscribe({
      next: (recipes: ReceipeModel[]) => (this.receipeList = recipes),
      error: (error) => console.error('Error fetching recipes', error),
    });
  }

  submitReceipe(): void {
    if (this.receipeForm.invalid) return;

    if (this.isEditMode && this.currentReceipeId) {
      this.updateReceipe();
    } else {
      this.addReceipe();
    }
  }

  addReceipe(): void {
    this.receipeService.createRecipe(this.receipeForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (newRecipe) => {
        this.receipeList.push(newRecipe);
        this.resetForm();
      },
      error: (error) => console.error('Error adding recipe', error),
    });
  }

  editReceipe(recipe: ReceipeModel): void {
    this.isEditMode = true;
    this.currentReceipeId = recipe._id || '';
    this.receipeForm.patchValue(recipe);
  }

  updateReceipe(): void {
    if (!this.currentReceipeId) return;

    this.receipeService.updateRecipe(this.currentReceipeId, this.receipeForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (updatedRecipe) => {
        const index = this.receipeList.findIndex((r) => r._id === this.currentReceipeId);
        if (index !== -1) this.receipeList[index] = updatedRecipe;
        this.resetForm();
      },
      error: (error) => console.error('Error updating recipe', error),
    });
  }

  deleteReceipe(id: string): void {
    this.receipeService.deleteRecipe(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => (this.receipeList = this.receipeList.filter((recipe) => recipe._id !== id)),
      error: (error) => console.error('Error deleting recipe', error),
    });
  }

  resetForm(): void {
    this.receipeForm.reset({
      difficulty: 'Medium',
      servings: 1,
    });
    this.isEditMode = false;
    this.currentReceipeId = null;
  }
}
