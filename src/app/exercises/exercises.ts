import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesService } from '../services/exercises.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercises.html',
  styleUrls: ['./exercises.css']
})
export class ExercisesComponent implements OnInit {
  exercises: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.exercisesService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load exercises. Please try again later.';
        this.loading = false;
      }
    });
  }
}