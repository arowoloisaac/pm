

export interface ApiResponse {
  token: string;
}

export const Token = localStorage.getItem("token");

// export const Token = 1;

export const ApiUrl = "https://localhost:7120/api";


