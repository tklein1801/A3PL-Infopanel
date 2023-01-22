export type ApiResponse<T> = {
  /** Response data */
  data: T[];
  /** UNIX-Timestamp */
  requested_at: number;
};

export type ErrorResponse = {
  status: 'Error';
  requested_at: number;
};

export type ValidSecretResponse = {
  status: 'Success';
  name: string;
  requested_at: number;
};

export type TimezoneResponse = {
  date: '2020-08-05 23:23:35';
  timezone_type: 3;
  timezone: 'Europe/Berlin';
};

export class Timezone {
  date: Date;
  timezone_type: number;
  timezone: string;

  constructor(data: TimezoneResponse) {
    this.date = new Date(data.date);
    this.timezone_type = data.timezone_type;
    this.timezone = data.timezone;
  }
}
