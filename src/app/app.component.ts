import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {
  ApiTableResponse,
  ApiVariablesResponse,
  TableData,
  Variables,
} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService],
})
export class AppComponent implements OnInit {
  title = 'CoreGears Test Task';
  variables: Variables[] = [];
  tableData: TableData[] = [];
  columnSum: Partial<Record<keyof TableData, number>> = {};
  isTableLoaded = false;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._fetchVariablesData();
    this._fetchTableData();
  }

  updateValues(): void {
    this._apiService.updateData(this.variables).subscribe(() => {
      this._fetchVariablesData();
      this._fetchTableData();
    });
  }

  private _fetchVariablesData(): void {
    this._apiService.fetchData().subscribe((data: ApiVariablesResponse) => {
      this.variables = data.result;
    });
  }

  private _fetchTableData(): void {
    this.isTableLoaded = false;
    this._apiService.fetchTable().subscribe((data: ApiTableResponse) => {
      this.tableData = data.result.map((record) => ({
        ...record,
        sum: Object.values(record)
          .slice(1)
          .reduce((acc, value) => acc + value),
      }));

      this.tableData.forEach((record) => {
        Object.keys(record)
          .slice(1)
          .forEach((key) => {
            this.columnSum[key as keyof TableData] = this.columnSum[
              key as keyof TableData
            ]
              ? this.columnSum[key as keyof TableData]! +
                (record[key as keyof TableData] as number)
              : (record[key as keyof TableData] as number);
          });
      });
      this.isTableLoaded = true;
    });
  }
}
