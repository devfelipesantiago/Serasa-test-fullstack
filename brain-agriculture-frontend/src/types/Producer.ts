import type { Farm } from './Farm';

export interface Producer {
  id: string;
  cpfCnpj: string;
  name: string;
  farms?: Farm[];
}