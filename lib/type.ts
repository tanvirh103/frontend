export type signInResponse = {
  statusCode: number;
  message: string;
  data: dataType | string;
  success: boolean;
};
export type dataType = {
  user: string;
  role: "employer" | "jobseeker"|"admin";
  token: string;
  expires: number;
};
