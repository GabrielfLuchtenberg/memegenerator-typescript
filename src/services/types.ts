export interface Params {
  template_id: string;
  texts: string[];
}

export interface Template {
  id: string;
  name: string;
  url: string;
  with: number;
  height: number;
  box_count: number;
}

export interface Meme {
  url: string;
}
