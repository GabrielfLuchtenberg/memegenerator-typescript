export interface Params {
  template_id: string;
  text: [string];
}

export interface Template {
  id: number;
  name: string;
  url: string;
  with: number;
  height: number;
  box_count: number;
}

export interface Meme {
  url: string;
}
