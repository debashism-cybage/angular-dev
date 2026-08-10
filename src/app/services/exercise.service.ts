import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
  equipments: string[];
}

export interface ExercisesMeta {
  nextCursor: string | null;
  hasNextPage: boolean;
  total: number;
}

export interface ExercisesResponse {
  success: boolean;
  meta: ExercisesMeta;
  data: Exercise[];
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly apiUrl = 'https://oss.exercisedb.dev/api/v1/exercises';

  constructor(private http: HttpClient) {}

  getExercises(cursor?: string): Observable<ExercisesResponse> {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }
    return this.http.get<ExercisesResponse>(this.apiUrl, { params });
  }
}