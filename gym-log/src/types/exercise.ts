export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
}

export interface Set {
  id: string;
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  sets?: Set[];
}