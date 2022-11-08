export interface ITableHeader {
  name: string;
  sort?: boolean;
}[]

export interface ITableUsers {
  id?: string;
  avatar?: string;
  name: string;
  description?: string;
  phone: string;
  address: string;
  date: string
  hour: string;
  state: string | boolean;
}