export type ErrorObject = {
  code: number;
  path: string;
  timestamp: string;
  message: string;
};

export type ErrorDetails<Details> = ErrorObject & {
  details: Details;
};

export type ErrorDetailsField = {
  field: string;
  message: string;
};
