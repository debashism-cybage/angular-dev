import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.html',
  styleUrls: ['./recipes.css']
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.recipesService.getRecipes().subscribe({
      next: (data: any) => {
        this.recipes = data.recipes || [];
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load recipes. Please try again.';
        this.loading = false;
      }
    });
  }
}