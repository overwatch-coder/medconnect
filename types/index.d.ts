export type SuccessResponse = {
  success: true;
  message: string;
  data: any;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type ResponseData = SuccessResponse | ErrorResponse;
