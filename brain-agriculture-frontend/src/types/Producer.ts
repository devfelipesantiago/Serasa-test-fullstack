import type { Farm } from './Farm';

export interface Producer {
  id: string;
  document: string;
  name: string;
  farms?: Farm[];
}