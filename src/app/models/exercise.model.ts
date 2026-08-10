export { Exercise } from '../exercises/exercise.model';

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