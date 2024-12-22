import { getWithExpiry } from "@/components/backgroundJob/backgroundJob";

export interface ApiResponse {
  token: string;
}

export const Token = getWithExpiry("token");

export const ApiUrl = "https://localhost:7120/api";
