export interface ApiRackets {
  _id: string;
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
}

export interface Racket extends Omit<ApiRackets, "_id"> {
  id: string;
}

export interface RacketsUser extends Partial<Racket> {
  user: string;
}
