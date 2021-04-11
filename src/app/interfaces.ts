export interface Variables {
  name: string;
  value: number;
}

export interface ApiVariablesResponse {
  result: Variables[];
}

export interface TableData {
  col1: string;
  col2: number;
  col3: number;
  col4: number;
  col5: number;
  col6: number;
}

export interface ApiTableResponse {
  result: TableData[];
}
