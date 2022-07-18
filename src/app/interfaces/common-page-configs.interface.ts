import { DocType } from '../enums/doc-types.enum';
import { StatementBasics } from '../services/statements.service';
import { ClientDetail } from './clients.interface';
import { MenuOption } from './menu-options.interface';

export interface PageConfig {
  header: string;
  subHeader: string;
}

export interface MenuPageConfig extends PageConfig {
  menu: MenuOption[];
}

export enum FinancialDocType {
  LIST,
  STATEMENT,
}

export interface FinancialDocListPageConfig extends PageConfig {
  financialDocType: FinancialDocType;
  items: FinancialDocItem[];
}

export interface FinancialDocItem {
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

export interface GeneralItemsListPageConfig extends PageConfig {
  columns: PageColumns[];
  items: GeneralItem;
}

export interface PageColumns {
  content: string;
  widthFactor: number;
  widthPerc?: string;
}

export interface GeneralItem {
  [refID: number]: GeneralItemField[];
}

export interface GeneralItemField {
  content: string;
  widthPerc?: string;
}
