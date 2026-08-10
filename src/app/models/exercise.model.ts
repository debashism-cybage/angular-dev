export interface Exercise {
  exerciseId: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  equipments: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
}

export interface ExerciseMeta {
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string | null;
}

export interface ExercisesResponse {
  success: boolean;
  meta: ExerciseMeta;
  data: Exercise[];
}