import { MenuOption } from './menu-options.interface';

export interface PageConfig {
  header: string;
  subHeader: string;
}

export interface MenuPageConfig extends PageConfig {
  menu: MenuOption[];
}

export interface FinancialDocListPageConfig extends PageConfig {
  list: FinancialDoc[];
}

export interface FinancialDoc {
  number: number;
  date: Date;
  detail: string;
  amount: number;
}
