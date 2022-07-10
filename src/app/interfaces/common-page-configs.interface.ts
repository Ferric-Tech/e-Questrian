import { DocType } from '../enums/doc-types.enum';
import { ClientDetail } from './clients.interface';
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

export interface DocView extends PageConfig {
  docType: DocType;
  docNumber: number;
  docClient: ClientDetail;
  lineItems: LineItemGroup[];
}

export interface LineItemGroup {
  [groupName: string]: LineItem[];
}

export interface LineItem {
  number: number;
  date: Date;
  detail: string;
  amount: number;
}

export interface ProcessResultsPageConfig extends PageConfig {
  explainer: string;
  results: ProcessResult[];
}

export enum ResultType {
  NUMBER,
  DATE,
  LIST,
}

export interface ProcessResult {
  description: string;
  resultType: ResultType;
  result: any;
}
