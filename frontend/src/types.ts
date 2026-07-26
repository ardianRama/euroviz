export interface WorldBankDataPoint {
  country: {
    id: string;
    value: string;
  };
  date: string;
  value: number | null;
}
