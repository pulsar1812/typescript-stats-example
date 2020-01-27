import fs from 'fs';
import { MatchResult } from './MatchResult';

// Defining a tuple
type MatchData = [Date, string, string, number, number, MatchResult, string];

export abstract class CsvFileReader {
  // data is a 2D array
  data: MatchData[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): MatchData;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8'
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
      .map(this.mapRow);
  }
}
